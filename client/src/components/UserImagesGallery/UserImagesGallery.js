import React from 'react';
import './UserImagesGallery.css';

const UserImagesGallery = ({ loading, handleClose, show, images, image }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    if (loading) {
        return <p>Data is loading...</p>
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main position-fixed d-flex flex-row flex-wrap">
                {images.map((image) => (
                    <li className="list-unstyled p-2 m-auto" key={image}>
                        <img className="gallery-image mx-auto" src={image} />
                    </li>
                ))}
                <button className="x-close-btn position-absolute bg-transparent border-0" type="button" onClick={handleClose}> &#x2717; </button>
            </section>
        </div>
    );
};

export default UserImagesGallery;


// // With useEffect in HERE 
// import React, { useState, useEffect } from 'react';
// import { useUserContext } from '../../Utilities/Context/UserContext';

// import { ref, getStorage, list, listAll } from "firebase/storage";
// import { storage, firestore } from "../../Utilities/Firebase/Firebase.utils";

// import { Modal, Button } from "react-bootstrap";
// import './UserImagesGallery.css';

// const UserImagesGallery = ({ handleClose, show, image, children, ...otherProps }) => {
//     const currentUser = useUserContext(); // Current user
//     const showHideClassName = show ? "modal display-block" : "modal display-none";
//     const [images, setImages] = useState([]); // All uploaded user images
//     const [loading, setLoading] = useState(false);

//     const imageLength = images.length;
//     console.log(imageLength)
//     console.log(children, loading, otherProps)

//     useEffect(() => {
//         if (currentUser) {
//             const fetchImages = async () => {
//                 const result = await storage.ref(`images/${currentUser.id}`).listAll();
//                 const urlPromises = result.items.map((imageRef) =>
//                     imageRef.getDownloadURL()
//                 );
//                 return Promise.all(urlPromises);
//             };

//             const loadImages = async () => {
//                 setLoading(true);
//                 try {
//                     const images = await fetchImages();
//                     setImages(images);
//                 } catch (error) {
//                     // handle error, log it, show message, etc...
//                 }
//                 setLoading(false);
//             };
//             loadImages();
//         } else {
//             setImages([]);
//         }
//     }, [currentUser]);

//     if (loading) {
//         return <p>Data is loading...</p>
//     }

//     return (
//         <div className={showHideClassName}>
//             <section className="modal-main">
//                 {images.map((image) => (
//                     <li key={image}>
//                         <img className="post-image mx-auto" src={image} />
//                     </li>
//                 ))}
//                 <button type="button" onClick={handleClose}>
//                     Close
//                 </button>
//             </section>
//         </div>
//     );
// };

// export default UserImagesGallery;