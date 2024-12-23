import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import Sidenav from '../components/Sidenav'
import UserChats from '../chats/UserChats'
import { useLocation } from 'react-router-dom'

const HomeScreen = () => {
    

    return (
        <main className='main'>
            <Sidenav/>
            <UserChats />
        </main>
    )
}

export default HomeScreen