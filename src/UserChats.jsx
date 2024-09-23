import React from 'react'
import './UserChats.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMiniUserPlus } from "react-icons/hi2";


const UserChats = ({ chatsArr , userInfo}) => {
    const validarAutor = (autor) =>{
        if(userInfo && autor.toLowerCase() == userInfo.username.toLowerCase()){
            return 'Tu'
        }
        else{
            return autor
        }
    }

    return (
        <>
            <header className='chats-header'>
                <h3 className='mensajes text'>Mensajes</h3>
                <nav className='search-add-nav'>
                    <div className='search-icon'>
                        <FaMagnifyingGlass className='lupa' />
                    </div>
                    <h4 className='añadir-amigos'><HiMiniUserPlus className='friend-icon' />Añadir amigos</h4>
                </nav>
            </header>
            <main className='chats-main'>
                <nav className='chats-nav'>
                    {
                        chatsArr && chatsArr.map((chat) => {
                            const { chat_pfp, estado, chat_id, chat_username, last_msj, mensajes } = chat
                            const ultimoMensaje = mensajes[mensajes.length - 1]
                            const { emisor, text } = ultimoMensaje

                            return (
                                <div className='chat-box' key={chat_id}>
                                    <img src={chat_pfp} alt="chat-pfp" className='chat-pfp' />
                                    <div className='titulo-ult-msg'>
                                        <h3 className='chat-title'>{chat_username}</h3>
                                        <h4 className='last-msg'>{validarAutor(emisor)}:  {text}</h4>
                                    </div>
                                    <h4 className='last-msg-date'>{last_msj}</h4>
                                </div>
                            )
                        })
                    }
                </nav>
            </main>
        </>
    )
}

export default UserChats