import React from 'react';
import { useAuth } from '../components/Auth';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const auth = useAuth()

  const navigate = useNavigate()

  const handleLogout = () =>{
    auth.logout()
    navigate('/')
  }
  
  return (
    <div
     style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        color: 'white'
     }}
    >
    
     <h1>Witaj {auth.user}</h1>
     <button onClick={handleLogout}>Logout</button>
    </div>
  )
};



export default Account;