export const getUser = async () =>{
    const response = await fetch(
        '/data.JSON',
        {
            method: "GET"
        }
    )

    return response.json()
}
