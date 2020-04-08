import React from 'react'
import Send from '../images/send.png'

const ChatBox = ({message, setMessage, sendMessage, typing}) => {
    return (
        <form className="form-input-chat">
            <input 
                placeholder="Type message here..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null }
                onKeyUp={() => typing()} 
            />
            <button type="submit" onClick={(e) => sendMessage(e)}><img src={Send} width="20"/></button>
        </form>
    )
}

export default ChatBox