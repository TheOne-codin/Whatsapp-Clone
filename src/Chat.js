import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MicOutlined, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React, { useState } from 'react'
import './chat.css'
import axios from './axios'

function Chat({messages}) {

    const [input, setInput] = useState('')
const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
        message: input,
        name: "Demo User",
        timestamp: "Just Now",
        received: false
    })

    setInput('');
}


    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerinfo">
                    <h3>Room Name</h3>
                    <p>Last seen ....</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                <p className={`chat_message ${message.received && 'chat_reciever'}`}>
                    
                    <span className="chat_name">{message.name}</span>
                    
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                    </p>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="type a message"/>
                <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicOutlined/>
            </div>
        </div>
    )
}

export default Chat
