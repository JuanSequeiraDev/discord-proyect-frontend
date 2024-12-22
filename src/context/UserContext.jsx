import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const userContext = createContext()

export const UserProvider = ({ children }) => {

    const [isAuthentifiedState, setIsAuthentifiedState] = useState(sessionStorage.getItem('acces_token'))
    const [userContactsState, setUserContactsState] = useState([])
    const [userWorkspacesState, setUserWorkspacesState] = useState([])
    const [userInfoState, setUserInfoState] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            !Boolean(sessionStorage.getItem('acces_token')) && setIsAuthentifiedState(sessionStorage.getItem('acces_token'))
            !Boolean(sessionStorage.getItem('user_info')) && setUserInfoState(sessionStorage.getItem('user_info'))
            !Boolean(sessionStorage.getItem('user_contacts')) && setUserContactsState(sessionStorage.getItem('user_contacts'))
            !Boolean(sessionStorage.getItem('user_workspaces')) && setUserWorkspacesState(sessionStorage.getItem('user_workspaces'))
            setIsAuthentifiedState(sessionStorage.getItem('acces_token'))
            setUserInfoState(sessionStorage.getItem('user_info'))
            setUserContactsState(sessionStorage.getItem('user_contacts'))
            setUserWorkspacesState(sessionStorage.getItem('user_workspaces'))
        },
        [userContactsState]
    )

    const login = (auth_token, user_info, user_contacts, user_workspaces) => {
        sessionStorage.setItem('acces_token', auth_token)
        setIsAuthentifiedState(sessionStorage.getItem('acces_token'))
        sessionStorage.setItem('user_info', user_info)
        setUserInfoState(sessionStorage.getItem('user_info'))
        sessionStorage.setItem('user_contacts', user_contacts)
        setUserContactsState(sessionStorage.getItem('user_contacts'))
        sessionStorage.setItem('user_workspaces', user_workspaces)
        setUserWorkspacesState(sessionStorage.getItem('user_workspaces'))
        navigate('/home')
    }

    const contactAdded = (user_contacts) =>{
        sessionStorage.setItem('user_contacts', user_contacts)
        setUserContactsState(sessionStorage.getItem('user_contacts'))
    }

    const workspaceAdded = (user_workspaces) =>{
        sessionStorage.setItem('user_workspaces', user_workspaces)
        setUserWorkspacesState(sessionStorage.getItem('user_workspaces'))
    }

    return (
        <userContext.Provider
            value={
                {
                    acces_token: isAuthentifiedState,
                    login,
                    userContacts: userContactsState,
                    userWorkspaces: userWorkspacesState,
                    userInfo: userInfoState,
                    contactAdded,
                    workspaceAdded
                }
            }>
            {children}
        </userContext.Provider>
    )
}