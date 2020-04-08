import React, { createContext, useState } from 'react'

const useChatContext = createContext(null)

const UseChatProvider = ({ children }) => {
	const [ name, setName ] = useState('')
	const [ room, setRoom ] = useState('')
	const [ channel, setChannel ] = useState(['general', 'vacation', 'science', 'hobby', 'fun'])
	const [ status, setStatus ] = useState('')

	return (
		<useChatContext.Provider value={{ name, setName, room, setRoom, channel, setChannel, status, setStatus }}>
			{ children }
		</useChatContext.Provider>
	)
}

export { useChatContext, UseChatProvider }