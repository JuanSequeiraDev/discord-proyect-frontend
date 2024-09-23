import React, { useEffect, useState } from 'react'
import './Sidenav.css'
import { TbMessageCircleFilled } from "react-icons/tb";
import { Link, NavLink } from 'react-router-dom';
import { getUser } from '../../fetching';

const Sidenav = (/* {userInfo} */) => {
    const [userInfo, setUserInfo] = useState()

    useEffect(
        () => {
            setTimeout(
                () => {
                    getUser().then(usuario => {
                        setUserInfo(usuario[0])
                    })
                },
                250
            )
        },
        []
    )

/*     console.log(userInfo) */

    return (
        <nav className='sidenav'>
            <NavLink className='chats-icon' to='/'>
                <div >
                    <TbMessageCircleFilled className='msg-bubble' />
                </div>
            </NavLink>
            {
                userInfo && userInfo.canales.map((canal) => {
                    const { canal_pfp, canal_id } = canal
                    return (
                        <NavLink className='canal-icon' to={'/canal/' + canal_id} key={canal_id}>
                            <div >
                                <img src={canal_pfp} alt="img del canal" className='canal-img' />
                            </div>
                        </NavLink>
                    )
                })
            }
        </nav>
    )
}

export default Sidenav