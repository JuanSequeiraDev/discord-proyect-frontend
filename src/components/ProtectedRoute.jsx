import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {acces_token} = useContext(userContext)
    
    return (
            acces_token
            ? <Outlet/>
            : <Navigate to={'/'}/>
    )
}

export default ProtectedRoute