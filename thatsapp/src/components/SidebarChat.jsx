import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import "./SidebarChat.css"
function SidebarChat({id,name}) {

  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("chatRooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
       
          setMessages(snapshot.docs.map((doc) => doc.data()))
        
          );
    }
  }, [id]);


  return  <>
    <Link to={`/chats/${id}`}>
    <div className='sidebarChat'>
        <AccountCircle className='sidebarChat_icon'/>
        <div className="sidebarChat__info">
        <h2>{name}</h2>
        {messages[0]?(
          <p className='sidebarChat__lastMsg'>{messages[0]?.name.split(' ')[0]}: 
          <span>
          {messages[0]?.message}
          </span>
          </p>):("")}
        </div>
    </div>
    </Link>
    </>
 
}

export default SidebarChat;