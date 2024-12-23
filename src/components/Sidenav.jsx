import React, { useContext, useEffect, useState } from 'react'
import './Sidenav.css'
import { TbMessageCircleFilled } from "react-icons/tb";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { userContext } from '../context/UserContext';
import { IoSettingsSharp } from "react-icons/io5";


const Sidenav = () => {
    const { userWorkspaces, userInfo } = useContext(userContext)
    const userWorkspacesObj = JSON.parse(userWorkspaces)
    const userInfoObj = JSON.parse(userInfo)
    const { pathname } = useLocation()
    console.log(userInfoObj)

    return (
        <>
            <nav className='sidenav'>
                <NavLink className='chats-icon' to='/home'
                    style={pathname == '/home' ? { backgroundColor: '#5865F2' } : { backgroundColor: 'rgb(57, 62, 70)' }}>
                    <TbMessageCircleFilled className='msg-bubble' />
                </NavLink>
                {
                    userWorkspacesObj && userWorkspacesObj.map((workspace) => {
                        const { workspace_img, workspace_id, workspace_name } = workspace
                        return (
                            <NavLink className='workspace-icon' to={'/workspace/' + workspace_id} key={workspace_id}>
                                <img src={workspace_img} alt="img del workspace" className='workspace-img' />
                            </NavLink>
                        )
                    })
                }
                <NavLink to={'/create-workspace'} className='create-server-bubble'>
                    <FaPlus className='create-server-icon' />
                </NavLink>
            </nav>
            <nav className='sidenav-full'>
                <header className='visuals-header'>
                    <div className='fake-input-box'>
                        <div className='fake-input'>
                            <span className='fake-input-txt'>Buscar o inciar conversacion</span>
                        </div>
                    </div>
                    <div className='content-box'>
                        <span className='content-txt'>Amigos</span>
                    </div>
                    <div className='content-box'>
                        <span className='content-txt'>Nitro</span>
                    </div>
                    <div className='content-box'>
                        <span className='content-txt'>Tienda</span>
                    </div>
                </header>
                <footer className='user-config-footer'>
                    <img className='user-config-pfp' src={userInfoObj.user_pfp} alt="imagen del usuario" />
                    <span className='user-config-username'>{userInfoObj.name}</span>
                    <IoSettingsSharp className='user-config-settings' />
                </footer>
            </nav>
        </>
    )
}

export default Sidenav