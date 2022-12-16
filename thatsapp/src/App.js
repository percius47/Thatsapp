
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import { useStateValue } from './StateProvider/StateProvider';
import {Helmet} from "react-helmet";
function App() {
  
  const [{ user }] = useStateValue();
  return (

 <div className='app'>
  <Helmet>
    <title>Thatsapp</title>
  </Helmet>
     {!user?(
       <Login/>
  
     ):(
      <div className="app__body">
      <Sidebar/>
          <Routes>
              <Route path="/" element={<Welcome/>}/>
              <Route path="/chats/:chatId" element={<ChatWindow/>}/>
            
              </Routes>
      </div>
     )}
     
      
      </div>
  )
}

export default App