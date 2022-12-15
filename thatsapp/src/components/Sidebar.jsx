import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SidebarChat from './SidebarChat';
import {db} from "../firebase/firebase"
import { useStateValue } from '../StateProvider/StateProvider';
export default function Sidebar() {

const [rooms,setRooms]=useState([]);

const [{ user }, dispatch] = useStateValue();

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

  return (
    
    <div className="sidebar">
    <div className="sidebar__header">
    <figure class="avatar ">
    <img src={user?.photoURL} alt="Avatar" 
className="avatar-img-lg" />
    </figure>
      {/* <img src={user?.photoURL} className='sidebar__topIcon'/> */}
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
    <SidebarChat addNewChat/>
    {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.Name} />
        ))}
    </div>

  </div>
);
  
}
