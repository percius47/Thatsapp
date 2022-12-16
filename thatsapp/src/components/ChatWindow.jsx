
import { AccountCircle, AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';


import { useStateValue } from '../StateProvider/StateProvider';
import "./ChatWindow.css"
import"../App.css"
export default function ChatWindow() {

  const {chatId}=useParams();
      const [{user}]=useStateValue();
    const [input, setInput] = useState("");
    const [chatName,setChatName]=useState("");
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
      if (chatId) {
        db.collection("chatRooms")
          .doc(chatId)
          .onSnapshot((snapshot) => setChatName(snapshot.data().Name));
  
        db.collection("chatRooms")
          .doc(chatId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }

    },[chatId])

    const sendMessage = (e) => {
        e.preventDefault();
    
        db.collection("chatRooms").doc(chatId).collection("messages").add({
          message: input,
          name: user.displayName,
          email:user.email,
          timestamp: serverTimestamp(),
        });
    
        setInput("");
      };

  return (


    <div className="chat">
    <div className="chat__header">
      <AccountCircle  />

      <div className="chat__headerInfo">
        <h3>{chatName}</h3>
        
    
          {(messages.length)?(
           <p> Last seen at {
              new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
          ).toUTCString()}</p>
          ):(
          <p>Hey there! I'm using Thatsapp! </p>)}
        
      </div>

      <div className="chat__headerRight">
          <SearchOutlined/>
     
      
          <MoreVert />
       
      </div>
    </div>
    <div className="chat__body">
      {messages.map((message) => (
        <p
          className={`chat__message
         ${     message.email === user.email && "chat__receiver"  }`
        }
        >
          <span className={`chat__name  ${     message.email === user.email && "chat__receiverName"  }`
        } style={{textOverflow: 'ellipsis'}}>
            
            {message?.name}
          </span>
          {message?.message}
        
          <span className="chat__timestamp">
        
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
       ))} 
    </div>
    
    <div className="chat__footer">
      <InsertEmoticon />
      <AttachFile />
      <form>
        <input
           value={input}
           onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          type="text"
        />
        <button
         onClick={sendMessage} 
         type="submit">
          Send a message
        </button>
      </form>
      <Mic />
    </div>
  </div>
)};