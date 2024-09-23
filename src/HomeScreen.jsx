import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import Sidenav from './assets/Sidenav'
import { getUser } from '../fetching'
import UserChats from './UserChats'

const HomeScreen = () => {
    const [userInfo, setUserInfo] = useState()
    const [chatsArr, setChatsArr] = useState()

    useEffect(
        () => {
            setTimeout(
                () => {
                    getUser().then(usuario => {
                        setUserInfo(usuario[0])
                        setChatsArr(usuario[0].chats)
                    })
                },
                250
            )
        },
        []
    )

    /*     console.log(chatsArr) */

    return (
        <main className='main'>
            <Sidenav/>
            <UserChats chatsArr={chatsArr && chatsArr} userInfo={userInfo && userInfo} />
        </main>
    )
}

export default HomeScreen