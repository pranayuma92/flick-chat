import React from 'react'
import Message from './Message'

const Messages = ({ messages, name, toBottom }) => {
    
    return (
        <div className="message-box">
            <div className="message-inner">
                { messages.map((message, i) => <Message key={i} message={message} name={name} />) }
            </div>
        </div>
    )
}

export default Messages