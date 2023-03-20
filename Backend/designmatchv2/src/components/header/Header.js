import React, {useState, useEffect} from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
    MainName,
    NavBtnLink,
    NavItemBtn,
    NavItem,
    NavLogo,
    NavbarContainer,
    MobileIcon,
    Button,
    NavLogoIcon,
    XIcon,
    ThreeLineIcon,
} from './NavbarElements';

import styled from 'styled-components';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    useEffect(() => {
        showButton();
      }, []);
      
      window.addEventListener('resize', showButton);

      return(
        <>
        <Nav>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
                <NavLogoIcon />
                DESIGNMATCH
            </NavLogo>
           
            <MobileIcon onClick={handleClick}>
                {click ? <XIcon /> : <ThreeLineIcon />}
            </MobileIcon>



            <NavMenu onClick={handleClick} click={click}>
                <NavItem>
                    <NavLink to='/about' onClick={closeMobileMenu}>
                       Informacje
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink to='/account' onClick={closeMobileMenu}>
                        Konto
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink to='/sign-in' onClick={closeMobileMenu}>
                        Logowanie
                    </NavLink>
                </NavItem>

                <NavItemBtn>
                    {button ? (
                        <NavBtnLink to='/sign-up'>
                            <Button fontBig primary>
                            Rejestracja-K
                            </Button>
                        </NavBtnLink>)
                : (
                    <NavBtnLink to='/sign-up'>
                        <Button onClick={closeMobileMenu} fontBig primary>
                        Rejestracja-M
                        </Button>
                        </NavBtnLink>
                )}
                </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
        </>
    )
};

export default Navbar;

    /*
    state = { clicked: false}
    
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }*/