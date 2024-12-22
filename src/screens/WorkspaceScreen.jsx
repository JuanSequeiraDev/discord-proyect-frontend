import React, { useContext, useEffect, useState } from 'react'
import Sidenav from '../components/Sidenav'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../context/UserContext'
import './WorkspaceScreen.css'
import { MdOutlineGroupAdd } from "react-icons/md";
import { checkJwt, getAuthenticationHeaders, getWorkspaceChannels } from '../../fetching'
import { FaHashtag } from "react-icons/fa";
import useForm from '../hooks/useForm'
import { FaPlus } from "react-icons/fa";
import Form from '../components/Form'



const WorkspaceScreen = () => {
    const { workspace_id } = useParams()
    const { userWorkspaces, userInfo } = useContext(userContext)
    const { user_id } = JSON.parse(userInfo)
    const workspaceObj = JSON.parse(userWorkspaces).find(workspace => workspace.workspace_id = workspace_id)
    const [workspaceChannels, setWorkspaceChannels] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getWorkspaceChannels(workspace_id)
                .then(
                    (channels) => {
                        if (channels == 'jwt expired') {
                            navigate('/')
                        }
                        setWorkspaceChannels(channels.data)
                    }
                )
        },
        []
    )


    //Form para crear canal
    const initial_state_form = {
        channel_name: ''
    }

    const [formDisplayState, setFormDisplayState] = useState(false)
    const { formState, handleChange } = useForm(initial_state_form)
    const [errorState, setErrorState] = useState(initial_state_form)

    const handleCreateChannel = async (event) => {
        event.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/channels/channel_name/` + workspace_id, {
            method: 'POST',
            body: JSON.stringify({
                owner_id: user_id,
                channel_name: formState.channel_name
            }),
            headers: getAuthenticationHeaders()
        })

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            checkJwt(data)

            if (data.code == 'USER_INVALID') {
                setErrorState(prevErrorState => {
                    return { ...prevErrorState, [`channel_name`]: data.message }
                })
            }
            var frm = document.getElementsByName('channel-form')[0];
            frm.reset()
        }

        else {
            setWorkspaceChannels((prevState) => {
                return [...prevState, data.data]
            })
        }
    }

    const handleFormDisplay = (e) => {
        e.preventDefault()
        if (!formDisplayState) {
            setFormDisplayState(true)
        }
        else {
            setFormDisplayState(false)
        }
    }


    //Form para enviar invitacion
    const [addFriendState, setAddFriendState] = useState(false)

    const handleAddFriendDisplay = (e) => {
        e.preventDefault()
        if (!addFriendState) {
            setAddFriendState(true)
        }
        else {
            setAddFriendState(false)
        }
    }

    const initial_form_state = {
        username: ''
    }

    const [usernameErrorState, setUsernameErrorState] = useState({
        username: ''
    })

    const form_props = {
        className: 'invite-friend-form'
    }

    const form_fields = [
        {
            field_data_props: {
                name: 'username',
                id: "username",
                type: "text",
                className: "invite-friend-input"
            },
            field_container_props: {
                className: "invite-friend-div"
            },
            field_label: {
                label_text: usernameErrorState.username ? `Nombre de usuario - ${usernameErrorState.username}` : 'Nombre de usuario',
                label_props: {
                    name: "username",
                    className: "invite-friend-label",
                    style: usernameErrorState.username ? { color: 'red' } : { color: '#B5BAC1' }
                }
            },
            field_component: "INPUT"
        }
    ]

    const handleAddFriend = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/invite/` + user_id, {
            method: 'POST',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify({
                username: form_state.username,
                workspace_id: workspace_id,
                workspace_name: workspaceObj.workspace_name
            })
        }
        )

        setErrorState(initial_form_state)

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            checkJwt(data)
            if (data.code === 'USER_NOT_FOUND') {
                setUsernameErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['username']: data.message }
                })
            }
            if (data.code === 'USER_INVALID') {
                setUsernameErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['username']: data.message }
                })
            }
        }
        else {
            setAddFriendState(false)
        }
    }


    return (
        <>
            <Sidenav /> {/* Agregar un visual a que canal esta seleccionado */}
            <header className='workspace-header'>
                <h3 className='mensajes text'>{workspaceObj.workspace_name}</h3>
                <nav className='create-add-nav'>
                    {
                        formDisplayState
                            ?
                            <div className='form-deployment-bg'>
                                <form className='channel-name-form' name='channel-form' onSubmit={handleCreateChannel}>
                                    <header className='create-channel-header'>
                                        <button className='close-form-bttn' onClick={handleFormDisplay}> X </button>
                                        <h3 className='create-channel-title'>Crear un canal</h3>
                                        <button
                                            className='create-channel-bttn'
                                            type={Boolean(formState.channel_name) ? 'submit' : 'button'}
                                            style={!Boolean(formState.channel_name) ? { 'color': 'rgba(163, 179, 215, 0.46)' } : { 'color': 'rgb(163, 179, 215)' }}
                                        >Crear</button>
                                    </header>
                                    <label name='channel_name' className='channel-name-label'>{!errorState.channel_name ? 'NOMBRE DEL CANAL' : `NOMBRE DEL CANAL - ${errorState.channel_name}`}</label>
                                    <input
                                        name='channel_name'
                                        className='channel-name-input'
                                        onChange={handleChange}
                                        type='text'
                                        placeholder='canal-nuevo'
                                    />

                                </form>
                            </div>
                            : <div className='create-channel-box' onClick={handleFormDisplay}>
                                <span className='create-channel-span'>Crear canal</span>
                            </div>
                    }
                    {
                        addFriendState
                            ? <Form form_fields={form_fields} initial_state_form={initial_form_state} action={handleAddFriend} form_props={form_props}>
                                <header className='invite-friend-header'>
                                    <button className='close-form-bttn' onClick={handleAddFriendDisplay}> X </button>
                                    <h3 className='invite-friend-title'>Invita un amigo</h3>
                                    <button className='invite-friend-bttn' type='submit'>Enviar</button>
                                </header>
                            </Form>
                            : <MdOutlineGroupAdd className='invite-icon' onClick={handleAddFriendDisplay} />
                    }

                </nav>
            </header>
            <main className='workspace-main'>
                <nav className='workspace-channels-nav'>
                    {
                        workspaceChannels && workspaceChannels.map((channel) => {
                            const { channel_name, channel_id } = channel

                            return (
                                <Link to={`/workspace/${channel_name}/${channel_id}`} className='channel-box' key={channel_id}>
                                    <FaHashtag className='channel-hashtag' />
                                    <h3 className='channel-title'>{channel_name.toUpperCase()}</h3>
                                </Link>
                            )
                        })
                    }
                </nav>
            </main>

        </>
    )
}

export default WorkspaceScreen