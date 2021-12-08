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