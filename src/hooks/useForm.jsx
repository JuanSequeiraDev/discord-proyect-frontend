import { useState } from "react"


const useForm = (initial_form_state) =>{

    const [formState, setFormState] = useState(initial_form_state)

    const handleChange = (event) =>{

        const field_name = event.target.name
        const field_value = event.target.value

        setFormState((prevFormState)=>{
            return {...prevFormState, [field_name]: field_value}
        })
    }

    const handleChangeImage = (event, field_name) =>{
        const FILE_MB_LIMIT = 2

        //Llamo a la primera imagen cargada en este imput
        const file = event.target.files[0]

        if(file && file.size > FILE_MB_LIMIT * 1024 * 1024){
            alert('el archivo es muy pesado')
        }
    
        const reader = new FileReader()
        //Es un evento que se va a activar cuando se termine de cargar el archivo
        reader.onloadend = () =>{
            const image_base64 = reader.result
            setFormState(
                (prevFormState) =>{
                    return {...prevFormState, [field_name]: image_base64}
                }
            ) //El resultado de la lectura del archivo ya esta en base64
        }

        if(file){
            //Read as data URL, lee el archivo y transforma a base64
            reader.readAsDataURL(file)
        }
    }

    return {
        formState: formState,
        handleChange,
        setFormState,
        handleChangeImage
    }
}

export default useForm