import React, { useContext, useEffect, useState } from 'react'
import './Sidenav.css'
import { TbMessageCircleFilled } from "react-icons/tb";
import { Link, NavLink } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { userContext } from '../context/UserContext';

const Sidenav = () => {
    const {userWorkspaces} = useContext(userContext)
    const userWorkspacesObj = JSON.parse(userWorkspaces)

    return (
        <nav className='sidenav'>
            <NavLink className='chats-icon' to='/home'>
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
    )
}

export default Sidenav