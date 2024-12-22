import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import './RegisterScreen.css'
import { FaArrowLeft } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { getAuthenticationHeaders } from '../../fetching';

const RegisterScreen = () => {

    const [errorState, setErrorState] = useState({
        email: '',
        password: '',
        name: ''
    })

    const initial_form_state = {
        email: '',
        name: '',
        password: ''
    }

    const form_props = {
        className: "register-form"
    }

    const form_fields = [
        {
            field_data_props: {
                name: 'email',
                id: "email",
                type: "email",
                placeholder: "Example@gmail.com",
                className: "register-input"
            },
            field_container_props: {
                className: "field-container-div"
            },
            field_label: {
                label_text: errorState.email ? `Correo electrónico - ${errorState.email}` : 'Correo electrónico',
                label_props: {
                    name: "email",
                    className: "field-label",
                    style: errorState.email ? { color: 'red' } : { color: '#B5BAC1' }
                }
            },
            field_component: "INPUT"
        },
        {
            field_data_props: {
                name: 'password',
                id: "password",
                type: "password",
                className: "register-input"
            },
            field_container_props: {
                className: "field-container-div"
            },
            field_label: {
                label_text: errorState.password ? `Contraseña - ${errorState.password}` : 'Contraseña',
                label_props: {
                    name: "password",
                    className: "field-label",
                    style: errorState.password ? { color: 'red' } : { color: '#B5BAC1' }
                }
            },
            field_component: "INPUT"
        },
        {
            field_data_props: {
                name: 'name',
                id: "name",
                type: "text",
                className: "register-input"
            },
            field_container_props: {
                className: "field-container-div"
            },
            field_label: {
                label_text: errorState.name ? `Nombre de usuario - ${errorState.name}` : 'Nombre de usuario',
                label_props: {
                    name: "name",
                    className: "field-label",
                    style: errorState.name ? { color: 'red' } : { color: '#B5BAC1' }
                }
            },
            field_component: "INPUT"
        }
    ]

    const navigate = useNavigate()

    const handleRegister = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/user/register`, {
            method: 'POST',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify(form_state)
        }
        )

        setErrorState(initial_form_state)

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            if (data.code === 'EMAIL_DB_MATCH_ERROR') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['email']: data.message }
                })
            }
            if (data.code === 'USERNAME_DB_MATCH_ERROR') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['name']: data.message }
                })
            }

            if (data.code === 'VALIDATION_ERROR') {
                for (let field_name in data.data) {
                    if (field_name === 'hayErrores') { continue; }
                    if (data.data[field_name].errors.length >= 1) {
                        data.data[field_name].errors.forEach(error => {
                            setErrorState((prevState) => {
                                return { ...prevState, [field_name]: error.message }
                            })
                        });
                    }
                }
            }
        }
        else {
            navigate('/')
        }
    }

    return (
        <main className='register-screen'>
            <div className='discord-banner'>
                <FaDiscord />
                <h3 className='discord-title-register'>Discard</h3>
            </div>
            <section className='form-section'>
                <Link to={'/'} className="link-back-register"><FaArrowLeft /></Link>
                <h2 className='register-title'>Crear una cuenta</h2>
                <Form form_props={form_props} action={handleRegister} initial_state_form={initial_form_state} form_fields={form_fields} >
                    <button className='continue-register-bttn' type='submit'>Continuar</button>
                </Form>
                <span className='advice-span'>Al registrarte, aceptas las Condiciones del Servicio y la Politica de privacidad de Discard</span>
            </section>
        </main>
    )
}

export default RegisterScreen