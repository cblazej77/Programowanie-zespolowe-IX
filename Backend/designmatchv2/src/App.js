//Switch => Routes
import React, {useState} from 'react';
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


function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Head />
      {/* <Alarm /> */}
      <Routes>
        <Route path='/'  element={ <Home />} />
        <Route path='/about' element={ <About />} />
        <Route path='/account' element={<RequireAuth> <Account /> </RequireAuth>} />
        <Route path='/sign-in' element={ <SignIn />} />
        <Route path='/sign-up' element ={ <SignUp />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;