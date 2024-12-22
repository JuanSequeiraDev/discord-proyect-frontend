/* export const getUser = async () =>{
    const response = await fetch(
        '/data.JSON',
        {
            method: "GET"
        }
    )

    return response.json()
} */

import { useNavigate } from "react-router-dom"

const getChatMessages = async (chat_id) => {
    const acces_token = sessionStorage.getItem('acces_token')
    const response = await fetch(`${import.meta.env.VITE_URL_API}/api/chats/message/` + chat_id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${acces_token}`
            }
        }
    )

    return response.json()
}

const getChannelMessages = async (channel_id) => {
    const acces_token = sessionStorage.getItem('acces_token')
    const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/channels/message/` + channel_id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${acces_token}`
            }
        }
    )

    return response.json()
}

const getAuthenticationHeaders = () => {
    const acces_token = sessionStorage.getItem('acces_token')
    if(!acces_token){
        return {
            "Content-Type": "application/json"
        }
    }
    else{
        return {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${acces_token}`
        }
    }
}

const getWorkspaceChannels = async (workspace_id) => {
    const acces_token = sessionStorage.getItem('acces_token')
    const response = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/channels/` + workspace_id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${acces_token}`
            }
        }
    )

    return response.json()
}

const checkJwt = (data) => {
    return () => {
        const navigate = useNavigate()
        if (data == 'jwt expired') {
            navigate('/')
        }
    }
}

export { getAuthenticationHeaders, getChatMessages, checkJwt, getWorkspaceChannels, getChannelMessages }