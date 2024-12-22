import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { FaDiscord } from "react-icons/fa";
import './RegisterScreen.css'
import { userContext } from '../context/UserContext';
import { getAuthenticationHeaders } from '../../fetching';


const LoginScreen = () => {
    const {login} = useContext(userContext)

    const [errorState, setErrorState] = useState({
        email: '',
        password: '',
    })

    const initial_form_state = {
        email: '',
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
        }]

    const handleRegister = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/user/login`, {
            method: 'POST',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify(form_state)
        })

        const data = await responseHTTP.json()
        
        if (!data.ok) {
            if (data.code === 'USER_NOT_FOUND') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['email']: data.message }
                })
            }

            if (data.code === 'EMAIL_DB_MATCH_ERROR') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['email']: data.message }
                })
            }

            if (data.code === 'PASSWORD_INCORRECT') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['password']: data.message }
                })
            }

            if (data.code === 'EMAIL_NOT_VERIFIED') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, ['email']: data.message }
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
            login(data.data.acces_token, JSON.stringify(data.data.user_info), JSON.stringify(data.data.user_contacts), JSON.stringify(data.data.user_workspaces))
        }
    }

    return (
        <main className='register-screen'>
            <div className='discord-banner'>
                <FaDiscord />
                <h3 className='discord-title-register'>Discard</h3>
            </div>
            <section className='form-section'>
                {/*                 <Link to={'/login'} className="link-back-register"><FaArrowLeft /></Link> */}
                <h2 className='register-title'>Iniciar sesion</h2>
                <Form form_props={form_props} action={handleRegister} initial_state_form={initial_form_state} form_fields={form_fields} >
                    <Link className='to-forgot-password-link' to={'/forgot-password'}>¿Has olvidado la contraseña?</Link>
                    <Link to={'/register'}className='to-register-link'>¿No tienes una cuenta?</Link>
                    <button className='continue-register-bttn' type='submit'>Continuar</button>
                </Form>

            </section>
        </main>
    )
}

export default LoginScreen