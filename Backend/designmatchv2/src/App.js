//Switch => Routes
import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import Head from './components/header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { SignIn } from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import { RequireAuth } from './components/RequireAuth';
import UserPage from './pages/profile'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditUserPageMobile from "./pages/Profile/EditUserPageMobile";
import Modal from "./components/ModalA";
import Chat from "./pages/Chat/Chat";
import CompanyPage from './pages/Profile/CompanyPage';
import EditCompanyPage from './pages/Profile/EditCompanyPage';
import OtherUserPage from './pages/Profile/OtherProfile';
import Commisions from './pages/Home/Commisions';
import { AllPage, HeroContainer } from './pages/Home/Styles';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Head />
        {/* <Alarm /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<RequireAuth> {" "} <UserPage />{" "} </RequireAuth>} />
          <Route path="/other-account/:argument" element={<OtherUserPage />} />
          <Route path="/sign-in" element={
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
              {" "} <SignIn />{" "}
            </GoogleOAuthProvider>}
          />

          <Route path="/sign-up" element={
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
              {" "} <SignUp />{" "}
            </GoogleOAuthProvider>}
          />
          <Route
            path="/accountEdit"
            element={
              <RequireAuth>
                <EditUserPageMobile />
              </RequireAuth>}
          />
          <Route path="/test" element={<EditUserPageMobile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/1" element={<Modal />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/companyEdit" element={<EditCompanyPage />} />
          <Route path="/commisions"
            element={
              <>
                <AllPage>
                  <HeroContainer>
                    <Commisions />
                  </HeroContainer>
                </AllPage>
              </>
            } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
