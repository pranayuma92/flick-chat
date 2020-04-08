import React from 'react'
import ReactEmoji from 'react-emoji'

const Message = ({ message:{ user, text }, name }) => {
    let isCurrentUser = false
    let admClass = 'talk-bubble tri-right left-top left'

    const userName = name.trim().toLowerCase()

    if(user === userName){
        isCurrentUser = true
    }

    if(user === 'system'){
        admClass = 'admin-sytem'
    }

    return (
        isCurrentUser ? 
            (
                <div className="talk-bubble tri-right right-top right">
                    <div className="talktext">
                        <p>{ReactEmoji.emojify(text)}</p>
                        <span><em>me</em></span>
                    </div>
                </div>

            ) : (
                <div className={admClass}>
                    <div className="talktext">
                        <p>{ReactEmoji.emojify(text)}</p>
                        <span><em>{user}</em></span>
                    </div>
                </div>
            )
    )

}

export default Message