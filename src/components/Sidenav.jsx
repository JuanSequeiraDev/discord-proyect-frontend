import React, { useContext, useEffect, useState } from 'react'
import './Sidenav.css'
import { TbMessageCircleFilled } from "react-icons/tb";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { userContext } from '../context/UserContext';
import { IoSettingsSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { getAuthenticationHeaders } from '../../fetching';


const Sidenav = () => {
    const { userWorkspaces, userInfo } = useContext(userContext)
    const userWorkspacesObj = JSON.parse(userWorkspaces)
    const userInfoObj = JSON.parse(userInfo)
    const { pathname } = useLocation()


    /* Delete user */
    const navigate = useNavigate()

    const [deletePopState, setDeletePopState] = useState(false)

    const handleDeleteDisplay = (e) => {
        e.preventDefault()
        if (!Boolean(deletePopState)) {
            setDeletePopState(true)
        }
        else {
            setDeletePopState(false)
        }
    }

    const handleDeleteuser = async (e) => {
        e.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/user/delete/` + userInfoObj.user_id, {
            method: 'DELETE',
            headers: getAuthenticationHeaders()
        })

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            if(data == 'jwt expired'){
                navigate('/')
            }
        }
        else {
            navigate('/')
        }
    }

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
                <div className='delete-user-box'>
                    <FaTrashCan className='delete-user-icon' onClick={handleDeleteDisplay} />
                </div>
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
            {
                deletePopState
                    ? <div className='delete-user-deploy'>
                        <span onClick={handleDeleteDisplay} className='delete-user-quit'>X</span>
                        <span className='delete-user-continue'>Deseas <button onClick={handleDeleteuser} className='delete-user-bttn'>eliminar</button> tu usuario?</span>
                    </div>
                    : <></>
            }
        </>
    )
}

export default Sidenav