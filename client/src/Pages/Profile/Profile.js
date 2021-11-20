import {React, useState, useEffect} from 'react';
import './Profile.css';

import { auth } from '../../util/firebase/firebase.utils';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const Profile = ({ currUser }) => {
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setCurrentUser(currentUser)
        })

        return unsubscribe
    }, [])
    console.log(currentUser)
    
    return (
        <div className="container-flex">
            <div className="top-content-container w-100">
                <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
                    <div className="w-spacer profile-image-wrapper position-relative">
                        <div className="profile-image d-block"></div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
                        <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
                            <div className="m-r-md">
                                <div className="d-flex flex-column w-100 m-r-6">
                                    <div>
                                        {
                                            currentUser ?
                                            <h2>{currentUser.displayName}</h2>
                                            :
                                            <h2>No User Found</h2>
                                        }
                                    </div>
                                    <div className="d-flex flex-column flex-lg-row">
                                        <div className="">
                                            <i className="bi bi-people"></i>
                                            <span className="banner-list-font mx-1">0 friends</span>
                                        </div>
                                        <div className="mx-lg-2">
                                            <i className="bi bi-star"></i>
                                            <span className="banner-list-font mx-1">0 reviews</span>
                                        </div>
                                        <div className="">
                                            <i className="bi bi-camera"></i>
                                            <span className="banner-list-font mx-1">0 photos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className=" d-lg-none" style={{ color: '#0a0a0a' }}></hr>
                            <div className="ml-3">
                                <div className="update-profile-wrapper grey-line-break d-flex flex-column m-l">
                                    <div className="">
                                        <img></img>
                                        <a className="banner-list-font" href='#'>Add Profile Photos</a>
                                    </div>
                                    <div className="">
                                        <img></img>
                                        <a className="banner-list-font" href='#'>Update Your Profile</a>
                                    </div>
                                    <div className="">
                                        <img></img>
                                        <a className="banner-list-font" href='#'>Find Friends</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bot-content-container px-1 py-4 custom-padding">
                <div className="bot-content-wrapper mx-lg-auto d-flex flex-column flex-lg-row">
                    <div className="sidebar d-flex flex-column mx-auto mx-lg-0 mt-lg-5 py-lg-2 px-2">
                        {
                            currentUser ?
                                <h4 className="mb-3">{currentUser.email}</h4>
                                :
                                <h4 className="mb-3">No User Found</h4>
                        }
                        <ul className="p-0">
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-person-badge"></i>
                                    <h5 className="sidebar-list-font">Overview</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-person-plus"></i>
                                    <h5 className="sidebar-list-font">Friends</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-award mx-1"></i>
                                    <h5 className="sidebar-list-font">Reviews</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-lightbulb"></i>
                                    <h5 className="sidebar-list-font">Tips</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-bookmark-star"></i>
                                    <h5 className="sidebar-list-font">Bookmarks</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-bookmarks"></i>
                                    <h5 className="sidebar-list-font">Collections</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-calendar-check"></i>
                                    <h5 className="sidebar-list-font">Events</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                            <a className="cursor-pointer text-decoration-none">
                                <li className="d-flex flex-row sidebar-item sidebar-list-font">
                                    <i className="mx-2 bi bi-clock-history"></i>
                                    <h5 className="sidebar-list-font">Order History</h5>
                                </li>
                                <hr style={{ color: '#0a0a0a' }}></hr>
                            </a>
                        </ul>
                    </div>
                    <div className="d-flex flex-column flex-lg-row w-75 w-100-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-4">
                        <div className="activity m-l-3">
                            <h3 className="heading-red">Notifications</h3>
                            <p className="font-14">No new friend requests or compliments at this time.</p>
                            <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
                            <h3 className="heading-red">Recent Activity</h3>
                            <p className="font-14">We don't have any recent activity for you right now.</p>
                        </div>
                        <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
                        <div className="ml-3" style={{
                            'padding': '0 1rem',
                            'borderLeft': '1.25px solid rgb(10 10 10 / 25%)'}}>
                            <h3 className="heading-red mb-1 break-word">About dasdasdasddadsadadsada
                                {
                                    currentUser ?
                                        <h3 className="heading-red mb-1">{currentUser.email}</h3>
                                        :
                                        <h3 className="heading-red mb-1">No User Found</h3>
                                } 
                            </h3>
                            <h5 className="about-subHeading mt-2">Yelping Since</h5>
                            <p className="font-14">Some month</p>
                            <h5 className="about-subHeading mt-2">Things I Love</h5>
                            <p className="font-14">You haven't said yet...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
