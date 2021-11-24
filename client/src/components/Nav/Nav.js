import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import './Nav.css';

import { useUserContext, useUserContextUpdate, useUserNameUpdate, useUserEmailUpdate } from '../../../src/util/Context/UserContext';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Bell from './img/Bell.svg';
import Message from './img/Message.svg';
import Userprofile from './img/Userprofile.svg';
import Aboutme from './img/Aboutme.svg';
import Findfriends from './img/Findfriends.svg';
import Accountsetting from './img/Accountsetting.svg';

const Navmenu = ({}) => {
    const currentUser = useUserContext(); // Current user
    const toggleUser = useUserContextUpdate(); // Signout function
    const sliceDisplayName = useUserNameUpdate(); // Window width less than (width) ? update displayName length
    const sliceEmail = useUserEmailUpdate(); // Window width less than (width) ? update email length

    console.log(currentUser) // Take this and make a tooptip to display full name and email?

    return (
        <div className='tc f3'>
            <Navbar bg='light' expand='lg'>
                <a className="text-decoration-none" href="/">
                    <Navbar.Brand className="mx-2 mx-lg-5">Home</Navbar.Brand>
                </a>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <hr></hr>
                    <Nav className='ml-5'>
                        <Nav.Link className='link-font' href="#home">Write a Review</Nav.Link>
                        <Nav.Link className='link-font' href="#link">Events</Nav.Link>
                        <Nav.Link className='link-font' href="#link">Talk</Nav.Link>
                    </Nav>
                    <div className="d-flex flex-row justify-content-lg-center align-items-center ml-auto">
                        <img className='nav-img me-2' src={Message}></img>
                        <img className='nav-img me-2' src={Bell}></img>
                        <img className='nav-img-lrg' src={Userprofile}></img>
                        <NavDropdown className='custom-dropdown-class me-3' id="basic-nav-dropdown">
                            <div className="d-flex flex-row">
                                <img className='nav-img-sml me-2' src={Userprofile}></img>
                                <div className="d-flex flex-column">
                                    {
                                        currentUser ? 
                                            <span>{sliceDisplayName(currentUser)}</span>
                                            :
                                            <span>No User</span>
                                    }
                                    {
                                        currentUser ?
                                            <span className="tool-tip" data-tip={currentUser.email}>{sliceEmail(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></span>
                                            :
                                            <span>No Email</span>
                                    }
                                </div>
                            </div>
                            <NavDropdown.Divider />
                            <div className="link-wrapper my-1">
                                <img className="link-font-sml me-2 inline-block" src={Aboutme}></img><a className="link-font-sml"><Link className="link-font-sml" to="/profile">About Me</Link></a>
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
                                    {
                                        currentUser ?
                                            <a className="option" onClick={toggleUser}>
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
}

export default Navmenu