import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useUserContext, useUserNameUpdate } from '../../Utilities/Context/UserContext';
import { storage, firestore } from "../../Utilities/Firebase/Firebase.utils";
import usePhotoCountHook from '../../Utilities/Count/Count';
import { ref, uploadBytesResumable } from "firebase/storage"; 
import Post from '../../../src/components/Post/Post';
import CustomButton from '../../components/Custom-button/Custom-button';
import TimeStamp from '../../components/TimeStamp/TimeStamp';

import ProfilePic from './img/profilePICN.svg';
import './Profile.css';

const Profile = () => {
    const currentUser = useUserContext(); // Current user
    const sliceDisplayName = useUserNameUpdate(); // Window width < (width) ? update displayName length
    const photoCountHook = usePhotoCountHook(); // Photo count hook
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const metadata = { contentType: 'image/jpeg' };
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    // Listen for state changes, errors, and completion of the upload.
    const handleUpload = () => {
        uploadTask.on('state_changed',
            (snapshot) => { console.log(snapshot) },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                    default:
                        console.log(error);
                }
            },
            () => {
                storage
                    .ref('images/')
                    .child(image.name)
                    .getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (url) => {
                        setUrl(url);
                        const userRef = firestore.doc(`users/${currentUser.id}`)
                        await userRef.update({
                            photoURL: url
                        });
                        console.log('File available at', url);
                    })
            }
        );
    }
    // console.log("image: ", image);
    // console.log(image.lastModifiedDate) 

    const handleUploadChange = e => { 
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const currentTime = currentUser ? currentUser.createdAt.seconds : ''; // Current user time profile created
    function timeConverter(currentTime) {
        if (currentUser) {
            let a = new Date(currentTime * 1000);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let min = a.getMinutes();
            let sec = a.getSeconds();
            let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
        }
    }

    return (
        <div className="container-flex">
            <div className="top-content-container w-100">
                <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
                    <div className="w-spacer profile-image-wrapper position-relative">
                        {
                            currentUser ?
                                <input
                                    type="file"
                                    for="Upload Image"
                                    accept="image/*"
                                    name="image"
                                    id="file"
                                    onChange={e => { photoCountHook.changePhotoCount(e); handleUploadChange(e) }}
                                    onClick={handleUploadChange}
                                    style={{ display: "none" }}
                                />
                                : ''
                        }
                        <label for="file">  
                            <>
                                <img
                                    className="profile-image d-block"
                                    src={currentUser && currentUser.photoURL ? currentUser.photoURL : ProfilePic}
                                    alt="Profile picture"
                                    data-for='makeitspec'
                                    data-tip={currentUser && currentUser.photoURL ? "Click me to update profile picture!" : "Sign in to upload profile picture!"} />
                                <ReactTooltip id='makeitspec' place="top" type="dark" effect="float" />
                            </>
                        </label>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
                        <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
                            <div className="m-r-md">
                                <div className="d-flex flex-column w-100 m-r-7">
                                    <div>
                                        {
                                            currentUser ?
                                                <h2
                                                    data-for='spoghetti'
                                                    data-tip={currentUser.displayName}>
                                                    {sliceDisplayName(currentUser)}
                                                    <span><ReactTooltip id='spoghetti' place="top" type="dark" effect="float" /></span>
                                                </h2>
                                                :
                                                <h2>No User</h2>
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
                                            {photoCountHook.photoCount === undefined || photoCountHook.photoCount === null ?
                                                <span className="banner-list-font mx-1">0 photos</span> 
                                                :
                                                <span className="banner-list-font mx-1">{photoCountHook.photoCount.count} photos</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className=" d-lg-none" style={{ color: '#0a0a0a' }}></hr>
                            <div className="ml-3">
                                <div className="update-profile-wrapper grey-line-break d-flex flex-column m-l">
                                    <div className="">
                                        {
                                            image.name !== undefined ?
                                                <CustomButton
                                                    type="button"
                                                    onClick={handleUpload}
                                                    noBackground>
                                                    <span className="underline">Add Profile Photo</span>
                                                </CustomButton>
                                                : ''
                                        }
                                    </div>
                                    <div className="">
                                        <a className="banner-list-font" href='#'>Update Your Profile</a>
                                    </div>
                                    <div className="">
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
                                <h4 className="mb-3 break-word-always">{currentUser.displayName}</h4>
                                :
                                <h4 className="mb-3">No User</h4>
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
                    <div className="d-flex flex-column flex-lg-row w-100-md w-75-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-2">
                        <div className="activity m-l-3">
                            <h3 className="heading-red">Notifications</h3>
                            <p className="font-14">No new friend requests or compliments at this time.</p>
                            <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
                            <h4 className="heading-red">Recent Activity</h4>
                            {<Post />}
                        </div>
                        <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
                        <div className="grey-line-break ml-3">
                            <h3 className="heading-red mb-1 break-word">About
                                {
                                    currentUser ?
                                        <h4
                                            data-for='mozzorello'
                                            data-tip={currentUser.displayName}
                                            className="heading-red mb-1">
                                            {sliceDisplayName(currentUser)}
                                            <span><ReactTooltip id='mozzorello' place="top" type="dark" effect="float" /></span>
                                        </h4>
                                        :
                                        <p className="heading-red mb-1">No User</p>
                                }
                            </h3>
                            <h5 className="about-subHeading mt-3">Yelping Since</h5>
                            {
                                currentUser ?
                                    <TimeStamp date={currentUser ? timeConverter(currentTime) : ''} locale="en-US" />
                                : 'No user found.'
                            }
                            <h5 className="about-subHeading mt-3">Things I Love</h5>
                            <p className="font-14">You haven't said yet...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;