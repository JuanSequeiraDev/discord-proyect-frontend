import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import './CreateWorkspaceScreen.css'
import { userContext } from '../context/UserContext';
import { getAuthenticationHeaders } from '../../fetching';
import useForm from '../hooks/useForm';

const CreateWorkspaceScreen = () => {
    const { userInfo, workspaceAdded, userWorkspaces } = useContext(userContext)
    const { user_id } = JSON.parse(userInfo)

    const [errorState, setErrorState] = useState({
        workspace_name: ''
    })

    const initial_form_state = {
        workspace_name: ''
    }

    const userWorkspacesArr = JSON.parse(userWorkspaces)

    const { formState, handleChange, handleChangeImage } = useForm(initial_form_state)

    const navigate = useNavigate()

    const handleCreateWorkspace = async (e) => {
        e.preventDefault()
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/workspaces/create/` + user_id, {
            method: 'POST',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify(formState)
        })

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            if (data.code == 'VALIDATION_ERROR') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, [`workspace_name`]: data.data.workspace_name.errors[0].message.replace('workspace_name', 'Nombre del servidor') }
                })
            }
        }
        else {
            userWorkspacesArr.push(data.data.workspace_credentials)
            console.log(userWorkspacesArr)
            workspaceAdded(JSON.stringify(userWorkspacesArr))

            navigate('/home')
        }
    }

    return (
        <main className='create-workspace-main'>
            <Link to={'/home'} className='to-home-arrow'><FaArrowLeft /></Link>
            <h2 className='create-workspace-title'>Crea tu servidor</h2>
            <span className='create-workspace-span'>Tu servidor es el lugar donde tú y tus amigos pasan <br /> tiempo juntos. <br /> Crea el tuyo y empieza a conversar.</span>
            {
                    formState.workspace_img
                    ? <img src={formState.workspace_img} className='workspace-img' />
                    :<div className='workspace-img-insert'>
                        <MdAddAPhoto className='img-insert' /> SUBIR
                    </div>
            }
            <form className='workspace-form' onSubmit={handleCreateWorkspace}>
                <input
                    name='workspace_img'
                    id='image'
                    type='file'
                    className='workspace-img-input'
                    onChange={(event) => handleChangeImage(event, 'workspace_img')}
                />
                <label
                    name="workspace_name"
                    className="workspace-label"
                    style={errorState.workspace_name ? { 'color': 'red' } : { 'color': '#B5BAC1' }}
                >
                    {errorState.workspace_name ? `Nombre del Servidor - ${errorState.workspace_name}` : 'Nombre del Servidor'}
                </label>
                <input name='workspace_name'
                    id="workspace_name"
                    type="text"
                    placeholder="WorkSpace123"
                    className="workspace-input"
                    onChange={handleChange}
                />
                <span className='workspace-form-span'>Al crear un servidor, aceptas las Directivas de la Comunidad de Discord</span>
                <button
                    type={Boolean(formState.workspace_name) ? 'submit' : 'button'}
                    className='workspace-form-bttn'
                    style={!Boolean(formState.workspace_name) ? { 'background-color': '#5865f255', 'color': '#fff5f55e' } : { 'background-color': '#5865F2', 'color': '#fff5f5eb' }}
                >Crear servidor</button>
            </form>


        </main>
    )
}

export default CreateWorkspaceScreen