import React from 'react';
import './Nav.css';

import { Link } from 'react-router-dom';
import { auth } from '../../util/firebase/firebase.utils';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Bell from './img/Bell.svg';
import Message from './img/Message.svg';
import Userprofile from './img/Userprofile.svg';
import Aboutme from './img/Aboutme.svg';
import Findfriends from './img/Findfriends.svg';
import Accountsetting from './img/Accountsetting.svg';


const Navmenu = ({ currentUser }) => (
    <div className='App tc f3'>
        <Navbar bg='light' expand='lg'>
            <a className="text-decoration-none" href="/">
                <Navbar.Brand className="mx-5">Yelp-Clone</Navbar.Brand>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='ml-5'>
                    <Nav.Link className='link-font' href="#home">Write a Review</Nav.Link>
                    <Nav.Link className='link-font' href="#link">Events</Nav.Link>
                    <Nav.Link className='link-font' href="#link">Talk</Nav.Link>
                </Nav>
                <div className="ml-auto right-nav-wrap">
                    <img className='nav-img me-2' src={Message}></img>
                    <img className='nav-img me-2' src={Bell}></img>
                    <img className='nav-img-lrg' src={Userprofile}></img>
                    <NavDropdown className='custom-dropdown-class me-3' id="basic-nav-dropdown">
                        <div className="d-flex flex-row">
                            <img className='nav-img-sml me-2' src={Userprofile}></img>
                            <div className="d-flex flex-column">
                                {
                                    currentUser ? 
                                        <span>{currentUser.displayName}</span> 
                                        :
                                        <span>No User Found</span>
                                }
                                {
                                    currentUser ?
                                        <span>{currentUser.email}</span>
                                        :
                                        <span>No Email Found</span>
                                }
                            </div>
                        </div>
                        <NavDropdown.Divider />
                        <div className="link-wrapper my-1">
                            <img className="link-font-sml me-2 inline-block" src={Aboutme}></img><span className="link-font-sml">About Me</span>
                        </div>
                        <div className="link-wrapper my-1">
                            <img className="link-font-sml me-2 inline-block" src={Findfriends}></img><span className="link-font-sml">Find Friends</span>
                        </div>
                        <div className="link-wrapper my-1">
                            <img className="link-font-sml me-2 inline-block" src={Accountsetting}></img><span className="link-font-sml">Account Settings</span>
                        </div>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="p-0">
                            <div className="text-center options">
                                { // auth.signOut method provided from firebase library
                                    currentUser ?
                                        <a className="option" onClick={() => auth.signOut()}>
                                            Sign Out
                                        </a>
                                        :
                                        <a><Link className="option" to="/signin">Sign In</Link></a>
                                }
                            </div>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Navbar.Collapse>
        </Navbar>
    </div>
)

export default Navmenu
