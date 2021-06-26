import React from 'react';
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import LogoSvg from '../Logo/email.png';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={LogoSvg} alt="Logo" style={{"height":"40px","paddingRight": "9px"}}/>
                            Node-Mail
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;