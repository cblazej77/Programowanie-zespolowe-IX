//Switch => Routes
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import Head from './components/header/Header';
import Home  from './pages/Home/Home';
import Account  from './pages/Account';
import About from './pages/About/About';
import { SignIn}  from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import { RequireAuth } from './components/RequireAuth';
import UserPage from './pages/profile'
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingPage from './pages/LoadingPage';
import EditUserPageMobile from './pages/Profile/EditUserPageMobile';
import Modal from './components/ModalA';


function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Head />
      {/* <Alarm /> */}
      <Routes>
        <Route path='/'  element={ <Home />} />
        <Route path='/about' element={ <About />} />
        <Route path='/account' element={ <RequireAuth> <UserPage /> </RequireAuth> } />
        <Route path='/sign-in' element={ <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> <SignIn /> </GoogleOAuthProvider>} />
        <Route path='/sign-up' element ={ <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> <SignUp /> </GoogleOAuthProvider>} />
        <Route path='/accountEdit' element={ <RequireAuth> <EditUserPageMobile /> </RequireAuth> } />
        <Route path='/test' element ={ <EditUserPageMobile />} />
        <Route path='/1' element ={ <Modal />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;