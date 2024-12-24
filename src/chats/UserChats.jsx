import React, { useContext, useState } from 'react'
import './UserChats.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import useForm from '../hooks/useForm.jsx';
import { checkJwt, getAuthenticationHeaders } from '../../fetching.js';
import { FaPlus } from "react-icons/fa";



const UserChats = () => {
    const { userContacts, userInfo, contactAdded } = useContext(userContext)
    const { user_id } = JSON.parse(userInfo)
    const [searchBarState, setSearchBarState] = useState(false)
    const initial_form_state = {
        username: ''
    }
    const { formState, handleChange, setFormState } = useForm(initial_form_state)
    const userContactsObj = JSON.parse(userContacts)
    const [errorState, setErrorState] = useState({
        username: ''
    })

    const handleSearchDisplay = (e) => {
        e.preventDefault()
        if(!searchBarState){
            setSearchBarState(true)
        }
        else{
            setSearchBarState(false)
        }
    }

    const navigate = useNavigate()


    const handleAddContact = async (event) => {
        event.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/chats/` + user_id, {
            method: 'POST',
            body: JSON.stringify(formState),
            headers: getAuthenticationHeaders()
        })

        const data = await responseHTTP.json()

        if (data == 'jwt expired') {
            navigate('/')
        }

        if (!data.ok) {
            if (data.code === 'USER_NOT_FOUND') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['username']: data.message }
                })
                setFormState((prevState) => {
                    return { ...prevState, ['username']: '' }
                })
                var frm = document.getElementsByName('contact-form')[0];
                frm.reset()
            }
        }
        else {
            contactAdded(JSON.stringify(data.data.user_chats))
        }
    }
    return (
        <>
            <header className='chats-header'>
                <h3 className='mensajes text'>Contactos</h3>
                <nav className='search-add-nav'>
                    <div className='search-icon'>
                        <FaMagnifyingGlass className='lupa' />
                    </div>
                    {
                        searchBarState
                            ? <form onSubmit={handleAddContact} className='contact-add-container' name='contact-form'>
                                <button className='close-form-bttn' onClick={handleSearchDisplay}> X </button>
                                <input
                                    onChange={handleChange}
                                    type="text" name='username'
                                    className='contact-input'
                                    placeholder={!errorState.username ? 'Usuario de tu amigo' : errorState.username}
                                />
                                <button className='add-friend-bttn' type={Boolean(formState.username) ? 'submit' : 'button'}>
                                    <FaPlus className='add-friend-icon' style={!Boolean(formState.username) ? { 'color': '#222327' } : { 'color': '#B5BAC1' }} />
                                </button>
                            </form>
                            : <>
                                <h4 onClick={handleSearchDisplay} className='añadir-amigos'><HiMiniUserPlus className='friend-icon' /> Añadir amigos</h4>
                            </>
                    }
                </nav>
            </header>
            <main className='chats-main'>
                <nav className='chats-nav'>
                    {
                        userContactsObj && userContactsObj.map((chat) => {
                            const { user_pfp, username, chat_id, last_message_content, last_message_time } = chat
                            let last_msg_date = ''
                            if (typeof (last_message_time) == 'string') {
                                last_msg_date = last_message_time.slice(2, 10)
                            }

                            return (
                                <Link to={`/chat/${chat_id}`} className='chat-box' key={chat_id}>
                                    <img src={user_pfp} alt="chat-pfp" className='chat-pfp' />
                                    <div className='titulo-ult-msg'>
                                        <h3 className='chat-title'>{username}</h3>
                                        <span className='last-msg'>{last_message_content}</span>
                                    </div>
                                    <span className='last-msg-date'>{last_msg_date}</span>
                                </Link>
                            )
                        })
                    }
                </nav>
            </main>
        </>
    )
}

export default UserChats