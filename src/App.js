import React, { useEffect, useState } from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js"
import axios from './axios'

function App() {
  const [messages, setMessages] = useState([]);  

  useEffect(() => {
      axios.get('/messages/sync')
        .then(response => {
          setMessages(response.data)
        })
    }, []);

    useEffect(() => {
      const pusher = new Pusher('f32ef55f16b0f5d529de', {
        cluster: 'ap2'
      });
  
      const channel = pusher.subscribe('message');
      channel.bind('inserted', function(newMessage) {
        setMessages([...messages, newMessage])
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }

    }, [messages])
console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
      <Sidebar/>
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
