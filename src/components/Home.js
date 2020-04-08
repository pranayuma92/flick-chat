import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useChatContext } from '../utils/useChat'
import Logo from '../images/logo.png'

const Home = () => {
	const { name, setName } = useContext(useChatContext)
	const { room, setRoom } = useContext(useChatContext)
	const { channel } = useContext(useChatContext)
	const { status } = useContext(useChatContext)

	return (
		<div className="outer-wrapper">
			<div className="inner-wrapper">
				<img src={Logo} />
				<input type="text" placeholder="Username" className="input-wrpper" onChange={(e) => setName(e.target.value)} value={name}/>
				<select value={room} onChange={(e) => setRoom(e.target.value)}>
					<option value="">select room</option>
					{ 
						channel.map((item, i) => (
							<option key={i} value={item}>{item}</option>
						))
					}
				</select>
				<Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to="/chat">
					<button className="button" type="submit">Sign In</button>
				</Link>
				<p>{ status }</p>
			</div>
		</div>
	)
}

export default 	Home