import React, { useState } from 'react'
import Form from '../components/Form'
import { useNavigate, useParams } from 'react-router-dom'
import './ForgotPasswordScreen.css'
import { RiLockPasswordLine } from "react-icons/ri";
import { getAuthenticationHeaders } from '../../fetching';

const ResetPasswordScreen = () => {
    const { reset_token } = useParams()

    const initial_state_form = {
        password: ''
    }

    const [errorState, setErrorState] = useState({
        password: ''
    })

    const form_fields = [
        {
            field_data_props: {
                name: 'password',
                id: "password",
                type: "password",
                placeholder: "EasyPassword123",
                className: "forgot-password-input"
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
        }
    ]

    const navigate = useNavigate()

    const handleResetPassword = async (form_state) => {
        const responseHTTP = await fetch('http://localhost:4237/api/user/reset-password/' + reset_token, {
            method: 'PUT',
            headers: getAuthenticationHeaders(),
            body: JSON.stringify(form_state)
        })

        const data = await responseHTTP.json()
        console.log(data)

        if (!data.ok) {
            if (data.code === 'MATCHING_PASSWORD') {
                setErrorState((prevErrorState) => {
                    return { ...prevErrorState, [`password`]: data.message }
                })
            }

            //Hacer una funcion que reciba data y setErr
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
        <main className='forgot-password-screen'>
            <div className='forgot-password-img-container'>
                <RiLockPasswordLine className='forgot-password-img' />
            </div>
            <h2 className='forgot-password-title'>Inserta tu nueva contraseña</h2>
            <Form initial_state_form={initial_state_form} form_fields={form_fields} action={handleResetPassword}>
                <button className='continue-bttn' type='submit'>Continuar</button>
            </Form>
        </main>
    )
}

export default ResetPasswordScreen