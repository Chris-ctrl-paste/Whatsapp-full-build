import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/api/v1/messages/sync')
      .then(response => {
        setMessages(response.data)

      })
  }, [])


  useEffect(() => {
    const pusher = new Pusher('89e4c35f10b186c53638', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
    // Clean up
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
    // Clean up function
  }, [messages])

  // console.log(messages)

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />


      </div>




    </div>
  );
}

export default App;
