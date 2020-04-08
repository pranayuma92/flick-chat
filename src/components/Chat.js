import React, { useState, useEffect, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ChatBox from './ChatBox'
import Messages from './Messages';
import { useChatContext } from '../utils/useChat'
import People from '../images/people.png'

let socket;

const Chat = ({ history }) => {
	const { name, room, status, setStatus } = useContext(useChatContext)
	const [ message, setMessage ] = useState('')
	const [ messages, setMessages ] = useState([])
	const [ isTyping, setTyping ] = useState('')
	const [ typingName, setTypingname ] = useState('')
	const [ useronline, setUseronline ] = useState('0')
 
	const ENDPOINT = 'localhost:5000'

	useEffect(() => {

		if(!name || !room){
			history.push('/')
		}

		socket = io(ENDPOINT)
		socket.emit('join', { name, room }, (error) => {
			if(error){
				setStatus('Username has taken!')
				history.push('/')
			}
		})

		return () => {
			socket.emit('leftRoom')
			socket.off()
		}

	}, [ENDPOINT, name, room])

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message])
			const objDiv = document.querySelector('.message-inner');
			objDiv.scrollTop = objDiv.scrollHeight;
		})

		socket.on('updateData', (data) => {
			setUseronline(data.count.length)
		})

		let timer;
		let timeout = 1000;

		socket.on('display', ({typing, name}) => {
			clearTimeout(timer);
			setTypingname(name)
			setTyping(true)
			if(typing){
				timer = setTimeout(() => setTyping(false), timeout)
			}
		})

		return () => {
			socket.off()
		}
	}, [messages])


	const sendMessage = (e) => {
		e.preventDefault()

		if(message){
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	const typing = () => {
		socket.emit('typing', { typing: true })
	}

	return (
		<div className="input-box-wrapper">
			<div className="status-bar">
				<h4>{room}</h4>
				<p><img src={People} width="25" /><span>{ useronline }</span></p>
			</div>
			<div className="container">
				<Messages messages={messages} name={name}/>
				<p className="typing-status">{ isTyping ? `${typingName} is typing...` : ''}</p>
				<ChatBox 
					message={message} 
					setMessage={setMessage} 
					sendMessage={sendMessage} 
					typing={typing} 
				/>
			</div>
		</div>
	)
}

export default Chat