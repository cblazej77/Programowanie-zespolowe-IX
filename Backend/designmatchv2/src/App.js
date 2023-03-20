//Switch => Routes
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Head from './components/header/Header';
import Home  from './pages/Home/Home';
import Account  from './pages/Account';
import About from './pages/About/About';
import SignUp from './pages/SignIn/SignIn';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Head />
      <Routes>
        <Route path='/'  element={ <Home />} />
        <Route path='/about' element={ <About />} />
        <Route path='/account' element={<Account />} />
        <Route path='/sign-in' element={ <SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;