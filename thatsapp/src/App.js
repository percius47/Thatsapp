
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider/StateProvider';
function App() {
  
  const [{ user }, dispatch] = useStateValue();
  return (

 <div className='app'>
     {!user?(
       <Login/>
  
     ):(
      <div className="app__body">
      <Sidebar/>
          <Routes>
              <Route path="/" />
              <Route path="/chats/:chatId" element={<ChatWindow/>}/>
            
              </Routes>
      </div>
     )}
     
      
      </div>
  )
}

export default App