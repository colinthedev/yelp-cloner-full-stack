// TESTING POINT OFF FRESH SAVE GOES WITH NEW FIREBASE CODE
import React, { useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';
import { useUserContext, useUserContextUpdate, useUserNameUpdate } from '../../../src/util/Context/UserContext';
import { storage } from "../../util/firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Profile.css';

const Profile = ({ }) => {
    const currentUser = useUserContext(); // Current user
    const sliceDisplayName = useUserNameUpdate(); // Window width < (width) ? update displayName length
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(() => {
        // getting stored image url
        const saved = localStorage.getItem('images/');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });
    
    const metadata = { contentType: 'image/jpeg'};
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    console.log(image.name)
    console.log(url)
    console.log(storageRef.name.value === true)

    // Listen for state changes, errors, and completion of the upload.
    const handleUpload = () => {
        uploadTask.on('state_changed',
            (snapshot) => {console.log(snapshot)},
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {        
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setUrl(url);
                        console.log('File available at', url);
                    })
            }
        );
    }
    console.log("image: ", image);
    console.log(url)

    useEffect(() => {
        // Storing profile photo url
        localStorage.setItem('images/', JSON.stringify(url));
    }, [url]);

    const handleUploadChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // const handleHover = () => {
    //     const imageHover = document.getElementById('myimg');
    //     imageHover.setAttribute('src', './img/profilePIC.png');
    // }

    // const handleHoverOut = (initialValue) => {
    //     const imageHover = document.getElementById('myimg');
    //     imageHover.setAttribute('src', initialValue);
    // }

    return (
        <div className="container-flex">
            <div className="top-content-container w-100">
                <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
                    <div className="w-spacer profile-image-wrapper position-relative">
                        <input
                            type="file"
                            for="Upload Image"
                            accept="image/*"
                            name="image"
                            id="file"
                            onChange={handleUploadChange}
                            onClick={handleUploadChange}
                            style={{display: "none"}}
                        />
                        <label for="file">
                            {
                                url.length <= 0 ?
                                    <img
                                        id='myimg'
                                        className="profile-image-default profile-image d-block"
                                        alt=""
                                    />
                                :
                                    <img
                                        id='myimg'
                                        className="profile-image d-block"
                                        src={url}
                                        alt=""
                                        // onMouseEnter={handleHover}
                                        // onMouseLeave={handleHoverOut}
                                    />
                            }
                        </label>
                    </div>
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
                        <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
                            <div className="m-r-md">
                                <div className="d-flex flex-column w-100 m-r-6">
                                    <div>
                                        {
                                            currentUser ?
                                                <h2
                                                    data-tip={currentUser.displayName}>
                                                    {sliceDisplayName(currentUser)}
                                                    <ReactTooltip place="top" type="dark" effect="float"/>
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
                                            <span className="banner-list-font mx-1">0 photos</span>
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
                                                <button
                                                    className="banner-list-font"
                                                    onClick={handleUpload}
                                                    >Add Profile Photo
                                                </button>
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
                                <h4 className="mb-3">{currentUser.displayName}</h4>
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
                    <div className="d-flex flex-column flex-lg-row w-75 w-100-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-4">
                        <div className="activity m-l-3">
                            <h3 className="heading-red">Notifications</h3>
                            <p className="font-14">No new friend requests or compliments at this time.</p>
                            <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
                            <h3 className="heading-red">Recent Activity</h3>
                            <p className="font-14">We don't have any recent activity for you right now.</p>
                        </div>
                        <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
                        <div className="grey-line-break ml-3">
                            <h3 className="heading-red mb-1 break-word">About
                                {
                                    currentUser ?
                                        <h3
                                            data-tip={currentUser.displayName}
                                            className="heading-red mb-1">
                                            {sliceDisplayName(currentUser)}
                                            <ReactTooltip place="top" type="dark" effect="float"/>
                                        </h3>
                                        :
                                        <h3 className="heading-red mb-1">No User</h3>
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





// // ALTERNATIVE TO ABOVE WITH NEW FIREBASE CODE
// import React, { useState } from 'react';
// import ReactTooltip from 'react-tooltip';
// import { useUserContext, useUserContextUpdate, useUserNameUpdate } from '../../../src/util/Context/UserContext';
// import './Profile.css';
// import { storage } from "../../util/firebase/firebase.utils";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const Profile = ({ }) => {
//     const currentUser = useUserContext(); // Current user
//     const sliceDisplayName = useUserNameUpdate(); // Window width < (width) ? update displayName length
//     const [image, setImage] = useState("");
//     const [url, setUrl] = useState("");

//     // Listen for state changes, errors, and completion of the upload.
//     const handleUpload = () => {
//         const uploadTask = storage.ref(`images/${image.name}`).put(image);
//         uploadTask.on('state_changed',
//             (snapshot) => { console.log(snapshot) },
//             (error) => {
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//                         break;
//                     case 'storage/canceled':
//                         break;
//                     case 'storage/unknown':
//                         break;
//                 }
//             },
//             (e) => {
//                 storage
//                     .ref("images")
//                     .child(image.name)
//                     .getDownloadURL(uploadTask.snapshot.ref)
//                     .then(url => {
//                         setUrl(url);
//                         console.log('File available at', url);
//                     })
//             }
//         );
//     }
//     console.log("image: ", image);
//     console.log(url)

//     const handleChange = e => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     return (
//         <div className="container-flex">
//             <div className="top-content-container w-100">
//                 <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="w-spacer profile-image-wrapper position-relative">
//                         <input
//                             type="file"
//                             for="Upload Image"
//                             accept="image/*"
//                             name="image"
//                             id="file"
//                             onChange={handleChange}
//                             onClick={handleChange}
//                             style={{ display: "none" }}
//                         />
//                         <label for="file">
//                             <img
//                                 id='myimg'
//                                 className="profile-image d-block"
//                                 src={url}
//                                 alt=""
//                             />
//                             {/* {
//                             null ?
//                             <img
//                                 // ref={}
//                                 className="profile-image d-block" />
//                             :
//                             <img/>
//                         } */}
//                         </label>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
//                         <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
//                             <div className="m-r-md">
//                                 <div className="d-flex flex-column w-100 m-r-6">
//                                     <div>
//                                         {
//                                             currentUser ?
//                                                 <h2 data-tip={currentUser.displayName}>{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h2>
//                                                 :
//                                                 <h2>No User</h2>
//                                         }
//                                     </div>
//                                     <div className="d-flex flex-column flex-lg-row">
//                                         <div className="">
//                                             <i className="bi bi-people"></i>
//                                             <span className="banner-list-font mx-1">0 friends</span>
//                                         </div>
//                                         <div className="mx-lg-2">
//                                             <i className="bi bi-star"></i>
//                                             <span className="banner-list-font mx-1">0 reviews</span>
//                                         </div>
//                                         <div className="">
//                                             <i className="bi bi-camera"></i>
//                                             <span className="banner-list-font mx-1">0 photos</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <hr className=" d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                             <div className="ml-3">
//                                 <div className="update-profile-wrapper grey-line-break d-flex flex-column m-l">
//                                     <div className="">
//                                         {
//                                             null ?
//                                                 <a
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={handleUpload}
//                                                 >Upload Profile Photo
//                                             </a>
//                                                 :
//                                                 <button
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={handleUpload}
//                                                 >Add Profile Photo
//                                             </button>
//                                         }
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Update Your Profile</a>
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Find Friends</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bot-content-container px-1 py-4 custom-padding">
//                 <div className="bot-content-wrapper mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="sidebar d-flex flex-column mx-auto mx-lg-0 mt-lg-5 py-lg-2 px-2">
//                         {
//                             currentUser ?
//                                 <h4 className="mb-3">{currentUser.displayName}</h4>
//                                 :
//                                 <h4 className="mb-3">No User</h4>
//                         }
//                         <ul className="p-0">
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-badge"></i>
//                                     <h5 className="sidebar-list-font">Overview</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-plus"></i>
//                                     <h5 className="sidebar-list-font">Friends</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-award mx-1"></i>
//                                     <h5 className="sidebar-list-font">Reviews</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-lightbulb"></i>
//                                     <h5 className="sidebar-list-font">Tips</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmark-star"></i>
//                                     <h5 className="sidebar-list-font">Bookmarks</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmarks"></i>
//                                     <h5 className="sidebar-list-font">Collections</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-calendar-check"></i>
//                                     <h5 className="sidebar-list-font">Events</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-clock-history"></i>
//                                     <h5 className="sidebar-list-font">Order History</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                         </ul>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row w-75 w-100-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-4">
//                         <div className="activity m-l-3">
//                             <h3 className="heading-red">Notifications</h3>
//                             <p className="font-14">No new friend requests or compliments at this time.</p>
//                             <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
//                             <h3 className="heading-red">Recent Activity</h3>
//                             <p className="font-14">We don't have any recent activity for you right now.</p>
//                         </div>
//                         <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                         <div className="grey-line-break ml-3">
//                             <h3 className="heading-red mb-1 break-word">About
//                             {
//                                     currentUser ?
//                                         <h3 data-tip={currentUser.displayName} className="heading-red mb-1">{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h3>
//                                         :
//                                         <h3 className="heading-red mb-1">No User</h3>
//                                 }
//                             </h3>
//                             <h5 className="about-subHeading mt-2">Yelping Since</h5>
//                             <p className="font-14">Some month</p>
//                             <h5 className="about-subHeading mt-2">Things I Love</h5>
//                             <p className="font-14">You haven't said yet...</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;




// FRESH SAVE POINT FROM THIS MORNING GOES WITH ORIGINAL FIREBASE CODE
// import React, { useState } from 'react';
// import ReactTooltip from 'react-tooltip';
// import { useUserContext, useUserContextUpdate, useUserNameUpdate } from '../../../src/util/Context/UserContext';
// import './Profile.css';

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// const Profile = ({ }) => {
//     const currentUser = useUserContext(); // Current user
//     const sliceDisplayName = useUserNameUpdate(); // Window width < (width) ? update displayName length
//     const [image, setImage] = useState("");
//     const [url, setUrl] = useState("");

//     const storage = getStorage();
//     const metadata = { contentType: 'image/jpeg' };
//     const storageRef = ref(storage, 'images/' + image.name);
//     const uploadTask = uploadBytesResumable(storageRef, image, metadata);
//     // console.log(image)
//     // console.log(storageRef)

//     // Listen for state changes, errors, and completion of the upload.
//     const handleUpload = () => {
//         uploadTask.on('state_changed',
//             (snapshot) => { console.log(snapshot) },
//             (error) => {
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//                         break;
//                     case 'storage/canceled':
//                         break;
//                     case 'storage/unknown':
//                         break;
//                 }
//             },
//             (e) => {
//                 // getDownloadURL(uploadTask.snapshot.ref)
//                 //     .then(downloadURL => {
//                 //         setUrl(downloadURL);
//                 //         console.log('File available at', downloadURL);
//                 //     })

//                 storage
//                     .ref("images")
//                     .child(image.name)
//                     .getDownloadURL(uploadTask.snapshot.ref)
//                     .then(url => {
//                         setUrl(url);
//                         console.log('File available at', url);
//                     })
//             }
//         );
//     }
//     console.log("image: ", image);
//     console.log(url)

//     const handleChange = e => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     return (
//         <div className="container-flex">
//             <div className="top-content-container w-100">
//                 <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="w-spacer profile-image-wrapper position-relative">
//                         <input
//                             type="file"
//                             for="Upload Image"
//                             accept="image/*"
//                             name="image"
//                             id="file"
//                             onChange={handleChange}
//                             onClick={handleChange}
//                             style={{ display: "none" }}
//                         />
//                         <label for="file">
//                             <img
//                                 id='myimg'
//                                 className="profile-image d-block"
//                                 src={url}
//                                 alt=""
//                             />
//                             {/* {
//                                 null ?
//                                 <img
//                                     // ref={}
//                                     className="profile-image d-block" />
//                                 :
//                                 <img/>
//                             } */}
//                         </label>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
//                         <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
//                             <div className="m-r-md">
//                                 <div className="d-flex flex-column w-100 m-r-6">
//                                     <div>
//                                         {
//                                             currentUser ?
//                                                 <h2 data-tip={currentUser.displayName}>{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h2>
//                                                 :
//                                                 <h2>No User</h2>
//                                         }
//                                     </div>
//                                     <div className="d-flex flex-column flex-lg-row">
//                                         <div className="">
//                                             <i className="bi bi-people"></i>
//                                             <span className="banner-list-font mx-1">0 friends</span>
//                                         </div>
//                                         <div className="mx-lg-2">
//                                             <i className="bi bi-star"></i>
//                                             <span className="banner-list-font mx-1">0 reviews</span>
//                                         </div>
//                                         <div className="">
//                                             <i className="bi bi-camera"></i>
//                                             <span className="banner-list-font mx-1">0 photos</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <hr className=" d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                             <div className="ml-3">
//                                 <div className="update-profile-wrapper grey-line-break d-flex flex-column m-l">
//                                     <div className="">
//                                         {
//                                             null ?
//                                                 <a
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={handleUpload}
//                                                 >Upload Profile Photo
//                                                 </a>
//                                                 :
//                                                 <button
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={handleUpload}
//                                                 >Add Profile Photo
//                                                 </button>
//                                         }
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Update Your Profile</a>
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Find Friends</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bot-content-container px-1 py-4 custom-padding">
//                 <div className="bot-content-wrapper mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="sidebar d-flex flex-column mx-auto mx-lg-0 mt-lg-5 py-lg-2 px-2">
//                         {
//                             currentUser ?
//                                 <h4 className="mb-3">{currentUser.displayName}</h4>
//                                 :
//                                 <h4 className="mb-3">No User</h4>
//                         }
//                         <ul className="p-0">
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-badge"></i>
//                                     <h5 className="sidebar-list-font">Overview</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-plus"></i>
//                                     <h5 className="sidebar-list-font">Friends</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-award mx-1"></i>
//                                     <h5 className="sidebar-list-font">Reviews</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-lightbulb"></i>
//                                     <h5 className="sidebar-list-font">Tips</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmark-star"></i>
//                                     <h5 className="sidebar-list-font">Bookmarks</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmarks"></i>
//                                     <h5 className="sidebar-list-font">Collections</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-calendar-check"></i>
//                                     <h5 className="sidebar-list-font">Events</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-clock-history"></i>
//                                     <h5 className="sidebar-list-font">Order History</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                         </ul>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row w-75 w-100-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-4">
//                         <div className="activity m-l-3">
//                             <h3 className="heading-red">Notifications</h3>
//                             <p className="font-14">No new friend requests or compliments at this time.</p>
//                             <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
//                             <h3 className="heading-red">Recent Activity</h3>
//                             <p className="font-14">We don't have any recent activity for you right now.</p>
//                         </div>
//                         <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                         <div className="grey-line-break ml-3">
//                             <h3 className="heading-red mb-1 break-word">About
//                                 {
//                                     currentUser ?
//                                         <h3 data-tip={currentUser.displayName} className="heading-red mb-1">{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h3>
//                                         :
//                                         <h3 className="heading-red mb-1">No User</h3>
//                                 }
//                             </h3>
//                             <h5 className="about-subHeading mt-2">Yelping Since</h5>
//                             <p className="font-14">Some month</p>
//                             <h5 className="about-subHeading mt-2">Things I Love</h5>
//                             <p className="font-14">You haven't said yet...</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;






// import React, { useRef, } from 'react';
// import ReactTooltip from 'react-tooltip';
// import { useUserContext, useUserContextUpdate, useUserNameUpdate } from '../../../src/util/Context/UserContext';
// import './Profile.css';

// const Profile = ({ }) => {
//     const currentUser = useUserContext(); // Current user
//     const sliceDisplayName = useUserNameUpdate(); // Window width less than (width) ? update displayName length

//     const uploadedImage = React.useRef(null);
//     const imageUploader = React.useRef(null);
//     console.log(imageUploader.current)

//     const handleImageUpload = e => {
//         const [file] = e.target.files;
//         if (file) {
//             const reader = new FileReader();
//             const { current } = uploadedImage;
//             current.file = file;
//             console.log(file)
//             reader.onload = e => {
//                 current.src = e.target.result;
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const addImageUpload = () => {
//         imageUploader.current.click()
//         console.log(imageUploader.current.click())
//     }

//     return (
//         <div className="container-flex">
//             <div className="top-content-container w-100">
//                 <div className="bot-content-wrapper px-1 py-2 mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="w-spacer profile-image-wrapper position-relative">
//                         <input
//                             type="file"
//                             for="Upload Image"
//                             accept="image/*"
//                             name="image"
//                             id="file"
//                             onChange={handleImageUpload}
//                             onClick={addImageUpload}
//                             ref={imageUploader}
//                             style={{ display: "none" }}
//                         />
//                         <label for="file">
//                             {
//                                 uploadedImage ?
//                                     <img
//                                         ref={uploadedImage}
//                                         id="Profile-img-output"
//                                         className="profile-image d-block" />
//                                     :
//                                     <img />
//                             }
//                         </label>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row align-items-lg-center w-lg-75 m-l-4">
//                         <div className="d-flex flex-column flex-lg-row ml-auto pr-1 m-r-md-vw">
//                             <div className="m-r-md">
//                                 <div className="d-flex flex-column w-100 m-r-6">
//                                     <div>
//                                         {
//                                             currentUser ?
//                                                 <h2 data-tip={currentUser.displayName}>{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h2>
//                                                 :
//                                                 <h2>No User</h2>
//                                         }
//                                     </div>
//                                     <div className="d-flex flex-column flex-lg-row">
//                                         <div className="">
//                                             <i className="bi bi-people"></i>
//                                             <span className="banner-list-font mx-1">0 friends</span>
//                                         </div>
//                                         <div className="mx-lg-2">
//                                             <i className="bi bi-star"></i>
//                                             <span className="banner-list-font mx-1">0 reviews</span>
//                                         </div>
//                                         <div className="">
//                                             <i className="bi bi-camera"></i>
//                                             <span className="banner-list-font mx-1">0 photos</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <hr className=" d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                             <div className="ml-3">
//                                 <div className="update-profile-wrapper grey-line-break d-flex flex-column m-l">
//                                     <div className="">
//                                         {
//                                             addImageUpload.value ?
//                                                 <a
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={addImageUpload}>Add Profile Photos
//                                                 </a>
//                                                 :
//                                                 <a
//                                                     className="banner-list-font"
//                                                     href='#'
//                                                     onClick={addImageUpload}>Update Profile Photos
//                                                 </a>
//                                         }
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Update Your Profile</a>
//                                     </div>
//                                     <div className="">
//                                         <a className="banner-list-font" href='#'>Find Friends</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bot-content-container px-1 py-4 custom-padding">
//                 <div className="bot-content-wrapper mx-lg-auto d-flex flex-column flex-lg-row">
//                     <div className="sidebar d-flex flex-column mx-auto mx-lg-0 mt-lg-5 py-lg-2 px-2">
//                         {
//                             currentUser ?
//                                 <h4 className="mb-3">{currentUser.displayName}</h4>
//                                 :
//                                 <h4 className="mb-3">No User</h4>
//                         }
//                         <ul className="p-0">
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-badge"></i>
//                                     <h5 className="sidebar-list-font">Overview</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-person-plus"></i>
//                                     <h5 className="sidebar-list-font">Friends</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-award mx-1"></i>
//                                     <h5 className="sidebar-list-font">Reviews</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-lightbulb"></i>
//                                     <h5 className="sidebar-list-font">Tips</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmark-star"></i>
//                                     <h5 className="sidebar-list-font">Bookmarks</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-bookmarks"></i>
//                                     <h5 className="sidebar-list-font">Collections</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-calendar-check"></i>
//                                     <h5 className="sidebar-list-font">Events</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                             <a className="cursor-pointer text-decoration-none">
//                                 <li className="d-flex flex-row sidebar-item sidebar-list-font">
//                                     <i className="mx-2 bi bi-clock-history"></i>
//                                     <h5 className="sidebar-list-font">Order History</h5>
//                                 </li>
//                                 <hr style={{ color: '#0a0a0a' }}></hr>
//                             </a>
//                         </ul>
//                     </div>
//                     <div className="d-flex flex-column flex-lg-row w-75 w-100-lg p-3 p-lg-0 m-l-4 pt-lg-3 pt-xl-4">
//                         <div className="activity m-l-3">
//                             <h3 className="heading-red">Notifications</h3>
//                             <p className="font-14">No new friend requests or compliments at this time.</p>
//                             <hr className="d-none d-lg-block" style={{ color: '#0a0a0a' }}></hr>
//                             <h3 className="heading-red">Recent Activity</h3>
//                             <p className="font-14">We don't have any recent activity for you right now.</p>
//                         </div>
//                         <hr className="d-lg-none" style={{ color: '#0a0a0a' }}></hr>
//                         <div className="grey-line-break ml-3">
//                             <h3 className="heading-red mb-1 break-word">About
//                                 {
//                                     currentUser ?
//                                         <h3 data-tip={currentUser.displayName} className="heading-red mb-1">{sliceDisplayName(currentUser)}<ReactTooltip place="top" type="dark" effect="float" /></h3>
//                                         :
//                                         <h3 className="heading-red mb-1">No User</h3>
//                                 }
//                             </h3>
//                             <h5 className="about-subHeading mt-2">Yelping Since</h5>
//                             <p className="font-14">Some month</p>
//                             <h5 className="about-subHeading mt-2">Things I Love</h5>
//                             <p className="font-14">You haven't said yet...</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;




