import React, { useState } from 'react'
import Form from '../components/Form'
import { Link, useNavigate } from 'react-router-dom'
import './ForgotPasswordScreen.css'
import { RiLockPasswordLine } from "react-icons/ri";
import { getAuthenticationHeaders } from '../../fetching';


const ForgotPasswordScreen = () => {
    const initial_form_state = {
        email: ''
    }

    const [errorState, setErrorState] = useState({
        email: ''
    })

    const [popState, setPopState] = useState('none')

    const form_fields = [
        {
            field_data_props: {
                name: 'email',
                id: "email",
                type: "email",
                placeholder: "Example@gmail.com",
                className: "forgot-password-input"
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
        }
    ]

    const handleForgotPassword = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/user/forgot-password`, {
            method: 'POST',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify(form_state)
        })

        const data = await responseHTTP.json()
        console.log(data)

        if (!data.ok) {
            if (data.code === 'EMAIL_NOT_VERIFIED') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, [`email`]: data.message }
                })
            }

            if (data.code === 'USER_NOT_FOUND') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, [`email`]: data.message }
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
            setPopState('flex')
        }
    }

    const handlePopUpBttn = (e) => {
        e.preventDefault()
        setPopState('none')
    }

    /* console.log(popState) */
    return (
        <main className='forgot-password-screen'>
            <div className='pop-up-bg' style={{ display: popState }}>
                <div className='pop-up-container'>
                    <div className='pop-up-header'>
                        <h3 className='pop-up-title'>Instrucciones enviadas</h3>
                        <p className='pop-up-text'>Hemos enviado instrucciones para cambiar tu contraseña a tu email. Revisa la bandeja de entrada y la carpeta de spam</p>
                    </div>
                    <div className='pop-up-footer'>
                        <button onClickCapture={handlePopUpBttn} className='pop-up-bttn'>Vale</button>
                    </div>
                </div>
            </div>
            <RiLockPasswordLine className='forgot-password-img' />
            <h2 className='forgot-password-title'>Cambiar tu contraseña</h2>
            <Form form_fields={form_fields} initial_state_form={initial_form_state} action={handleForgotPassword}>
                <Link className='to-register-link' to='/'>Iniciar sesion</Link>
                <br />
                <button className='continue-bttn' type='submit'>Continuar</button>
            </Form>
        </main>
    )
}

export default ForgotPasswordScreen