import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import"../App.css"

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SidebarChat from './SidebarChat';
import {db} from "../firebase/firebase"
import { useStateValue } from '../StateProvider/StateProvider';
export default function Sidebar() {

const [rooms,setRooms]=useState([]);

const [{ user }] = useStateValue();

useEffect(() => {
   const unsubscribe = db.collection("chatRooms").onSnapshot((snapshot) =>
    setRooms(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    )
  );

  return () => {
    unsubscribe();
  };
}, []);

const createChat = () => {
  const roomName = prompt("Please enter name for chat room");

  if (roomName) {
    db.collection("chatRooms").add({
      Name: roomName,
    });
  }
};

  return (
    
    <div className="sidebar">
    <div className="sidebar__header">

    <figure className="avatar ">
    <img src={user.photoURL} alt="Avatar" 
className="avatar-img-lg" 
/>
    </figure>
    
      <div className="sidebar__headerRight">
        
          <DonutLargeIcon />
     
       
          <ChatIcon />
        
       
          <MoreVertIcon />
     
      </div>
    </div>
    <div className="sidebar__search">
      <div className="sidebar__searchContainer">
        <SearchOutlinedIcon />
        <input placeholder="Search or start new chat" type="text" />
      </div>
    </div>
    <div className="sidebar__chats">
    
    {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.Name} />
        ))}
      
        
    </div>
    <button className='sidebar__addChat'onClick={createChat}>
         <AddCircleIcon />
         </button>
  </div>
);
  
}
