import React, { useEffect, useRef, useState } from 'react'
import "../css/Chat.css";
import { useParams } from 'react-router';
import db from '../firebase/firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';



import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar, IconButton } from '@material-ui/core';



function Chat() {
    const [input, setinput] = useState('')
    const [seed, setseed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{ user },] = useStateValue()
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ block: 'end' });
    })



    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName
                    (snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data())))
                );

        }
    }, [roomId])




    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();

        if (input === "") {

        } else {
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        }



        setinput("")
    }
    return (
        <div className="chat">
            <div className="chat_header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName} </h3>
                    <p>Last seen at {""}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.
                                toDate()
                        ).toUTCString()}
                    </p>
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
                    <p key={message.id} id={message.id}
                        className={`chat_message ${message.name === user.displayName
                            && "chat_reciever"}`}
                    >
                        <span className="chat_name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat_time">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>

                ))}


                <div ref={divRef} />;

            </div>
            <div className="chat_footer">
                <EmojiEmotionsIcon />

                <form>
                    <input
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
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
