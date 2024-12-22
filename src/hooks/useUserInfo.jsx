/* import { useEffect, useState } from "react"


const useUserInfo = async (user_id) => {

    const getUserInfo = async () => {
        const [user_info_state, setUserInfo] = useState([])
        const [user_info_loading_state, setUserInfoLoading] = useState(true)
        const [user_info_error_state, setUserInfoError] = useState(null)

        const response = await fetch('/data.JSON',
            {
                method: "GET"
            }
        )
        const data = await response.json()

        if (!data.ok) {
            setProductDetailError(data.message)
            setProductDetailLoading(false)
            return
        }
        else {
            setProductDetail(data.data.productoBuscado)
        }
        setProductDetailLoading(false)
    }

    useEffect(
        ()=>{
            getUserInfo()
        },
        []
    )

    return{
        user_info_state,
        user_info_loading_state,
        user_info_error_state
    }
} */