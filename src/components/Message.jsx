

export const Message = ({ mensaje }) => {
    const { created_at, content, username, message_id, user_pfp } = mensaje

    const hora = Number(created_at.slice(11,13))
    const horaArg = hora - 6

    return (
        <div className="message-box" key={message_id}>
            <div className="user-pfp-box">
                <img className="user-pfp" src={user_pfp} alt="" />
            </div>
            <div className="name-text-container">
                <div className="username-box">
                    <span className="username">{username}</span>
                    <span className="date">{created_at.slice(0, 10)} {horaArg}{created_at.slice(13,16)}</span>
                </div>
                <div className="text-box">
                    <span className="message-text">{content}</span>
                </div>
            </div>
        </div>
    )
}
