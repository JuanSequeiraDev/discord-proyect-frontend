import React, { useEffect, useState, useContext } from 'react'
import './ChatScreen.css'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import { checkJwt, getAuthenticationHeaders, getChatMessages } from '../../fetching';
import { Message } from '../components/Message';
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Form from '../components/Form.jsx';
import useForm from '../hooks/useForm.jsx';
import { TbSend2 } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import Sidenav from '../components/Sidenav.jsx';



const ChatScreen = () => {
    const { chatId } = useParams()
    const { userInfo, userContacts, contactAdded } = useContext(userContext)
    const userContactObj = JSON.parse(userContacts).find((contact) => contact.chat_id = chatId)

    //Reemplazar ultimo mensaje
    const userContactIndex = JSON.parse(userContacts).findIndex((contact) => contact.chat_id == chatId)
    const user_last_msj = JSON.parse(userContacts)[userContactIndex].last_message_content
    //.

    const { user_id } = JSON.parse(userInfo)
    const [chatMessages, setChatMessages] = useState([])

    const initial_state_form = {
        message: ''
    }

    const { formState, handleChange } = useForm(initial_state_form)

    const navigate = useNavigate()

    useEffect(
        () => {
            setTimeout(
                getChatMessages(chatId)
                    .then(
                        (messageArr) => {
                            if(messageArr == 'jwt expired'){
                                navigate('/')
                            }
                            setChatMessages(messageArr.data)
                        }
                    )
            ),
                250
        },
        []
    )


    const handleSendMessage = async (event) => {
        event.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/chats/message/` + chatId, {
            method: 'POST',
            body: JSON.stringify({
                user_id: user_id,
                message: formState.message
            }),
            headers: getAuthenticationHeaders()
        })

        const data = await responseHTTP.json()

        if (data == 'jwt expired') {
            navigate('/')
        }
        if (!data.ok) {

        }
        else {
            setChatMessages((prevState) => {
                return [...prevState, data.data.message_info[0]]
            })

            //Cuando el user_last_msj es null no le añade las comillas al content automaticamente y cuando es cualquier otro valor si, asi que aqui la solucion:
            const newLastMsg = user_last_msj ? data.data.message_info[0].content : `"${String(data.data.message_info[0].content)}"`
            contactAdded(userContacts.replace(String(user_last_msj), newLastMsg))
        }
    }

    return (
        <main className='chat-screen-container'>
            <Sidenav/>
            <header className='chat-header'>
                <Link to={'/home'}><FaArrowLeft className='return-arrow' /></Link>
                <img className='user-chat-pfp' src={userContactObj.user_pfp} alt="" />
                <span className='user-username'>{userContactObj.username}</span>
                <div className='icon-container'>
                    <div className='phone-icon-bubble'>
                        <BiSolidPhoneCall className='phone-icon' />
                    </div>
                    <div className='camera-icon-bubble'>
                        <BsFillCameraVideoFill className='camera-icon' />
                    </div>
                </div>
            </header>
            <main className='chat-main'>
                {
                    chatMessages && chatMessages.map((message) => <Message mensaje={message} />)
                }
            </main>
            <footer className='chat-footer'>
                <form onSubmit={handleSendMessage} className='footer-form'>
                    <div className='add-box'>
                        <FaPlus className='add-cross' />
                    </div>
                    <textarea spellCheck='false' type="text" name='message' onChange={handleChange} className='message-input' placeholder={`Mensaje @${userContactObj.username}`} />
                    <button
                        style={!Boolean(formState.message) ? { 'background-color': '#41444a' } : { 'background-color': '#5865F2' }}
                        className='send-icon-bttn'
                        type={Boolean(formState.message) ? 'submit' : 'button'}
                    >
                        <TbSend2 className='send-icon' style={!Boolean(formState.message) ? { 'background-color': '#41444a' } : { 'background-color': '#5865F2' }}/>
                    </button>
                </form>
            </footer>
        </main>
    )
}

export default ChatScreen