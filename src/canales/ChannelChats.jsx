import React, { useEffect, useState, useContext } from 'react'
import '../chats/ChatScreen.css'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import { getAuthenticationHeaders, getChannelMessages } from '../../fetching';
import { Message } from '../components/Message';
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import useForm from '../hooks/useForm.jsx';
import { TbSend2 } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";


const ChannelChats = () => {
    const { channel_id, channel_name } = useParams()
    const { userInfo } = useContext(userContext)


    const { user_id } = JSON.parse(userInfo)
    const [channelMessages, setChannelMessages] = useState([])

    useEffect(
        () => {
            setTimeout(
                getChannelMessages(channel_id)
                    .then(
                        (messageArr) => {
                            if (messageArr == 'jwt expired') {
                                navigate('/')
                            }
                            setChannelMessages(messageArr.data.message_info)
                        }
                    )
            ),
                250
        },
        []
    )

    //Form para enviar mensajes
    const initial_state_form = {
        message: ''
    }

    const { formState, handleChange } = useForm(initial_state_form)

    const navigate = useNavigate()

    const handleSendMessage = async (event) => {
        event.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/channels/message/` + channel_id, {
            method: 'POST',
            body: JSON.stringify({
                sender_id: user_id,
                message: formState.message
            }),
            headers: getAuthenticationHeaders()
        })

        const data = await responseHTTP.json()

        if (data == 'jwt expired') {
            navigate('/')
        }
        /*         if (!data.ok) {
        
                } */
        else {
            setChannelMessages((prevState) => {
                return [...prevState, data.data.message_info[0]]
            })
        }
    }

    return (
        <>
            <header className='chat-header'>
                <Link to={'/home'}><FaArrowLeft className='return-arrow' /></Link>
                <FaHashtag className='channel-hashtag' />
                <span className='user-username'>{channel_name}</span>
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
                    channelMessages && channelMessages.map((message) => <Message mensaje={message} />)
                }
            </main>
            <footer className='chat-footer'>
                <form onSubmit={handleSendMessage} className='footer-form'>
                    <div className='add-box'>
                        <FaPlus className='add-cross' />
                    </div>
                    <textarea spellCheck='false' type="text" name='message' onChange={handleChange} className='message-input' placeholder={`Mensaje #${channel_name}`} />
                    <button
                        style={!Boolean(formState.message) ? { 'background-color': '#41444a' } : { 'background-color': '#5865F2' }}
                        className='send-icon-bttn'
                        type={Boolean(formState.message) ? 'submit' : 'button'}
                    >
                        <TbSend2 className='send-icon' />
                    </button>
                </form>
            </footer>
        </>
    )
}

export default ChannelChats