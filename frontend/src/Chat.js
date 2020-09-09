import React, { useState } from 'react'
import "./Chat.css";

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'
import { Avatar, IconButton } from '@material-ui/core';


function Chat({ messages }) {

    const [input, setInput] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault();


        await axios.post('/api/v1/messages/new', {
            message: input,
            name: "John",
            timestamp: "00:21",
            received: true
        });

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src=" https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b2ba3c3a-7c99-4022-8dd8-ba7185cd85c0/dcman2t-246ff2b9-a3f6-48e2-bd62-6aac4e286aea.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjJiYTNjM2EtN2M5OS00MDIyLThkZDgtYmE3MTg1Y2Q4NWMwXC9kY21hbjJ0LTI0NmZmMmI5LWEzZjYtNDhlMi1iZDYyLTZhYWM0ZTI4NmFlYS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mGOvlqIC8cP9EsobZvl3i5cFnTEIPJgLQALw9Xu-dH4" />

                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            {/* messages */}
            <div className="chat_body">
                {messages.map((message) => (
                    <p
                        className={`chat_message ${message.received && "chat_reciever"}`}
                    >
                        <span className="chat_name">{message.name}
                        </span>
                        {message.message}
                        <span className="chat_time">
                            {message.timestamp}
                        </span>
                    </p>

                ))}



                {/* Chat reciever */}
                {/* <p className="chat_message chat_reciever"> */}
                {/* <span className="chat_name">Chris</span> */}
                {/* This is a message. */}
                {/* <span className="chat_time">
                        {new Date().toUTCString()}

                    </span> */}
                {/* </p> */}
            </div>
            <div className="chat_footer">
                <EmojiEmotionsIcon />

                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a Message"
                        type="text"
                    />
                    <button
                        onClick={sendMessage}
                        type="submit">
                        Send a message
                </button>
                </form>
                <MicIcon />

            </div>


        </div>
    )
}

export default Chat
