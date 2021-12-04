import React from 'react';
import { useUserContext } from '../../Utilities/Context/UserContext';

import './Post.css';

const Post = () => {
    console.log()
    const currentUser = useUserContext(); // Current user

    return (
        <div className="d-flex flex-column align-items-center-lg">
            <div className="d-flex flex-row">
                {
                    currentUser && currentUser.photoURL ?
                        <img className="thumbnail-img" src={currentUser.photoURL} alt='User' />
                        : 
                        <p className="post-title-default mx-1">
                            We don't have any recent activity for you right now.
                        </p>
                }
                
                {
                    currentUser && currentUser.photoURL ?
                        <div>
                            <p className="post-title mx-1">
                                {currentUser.displayName} added a profile photo.
                            </p>
                        </div>
                    : ''
                }
                <div className="time-stamp"></div>
            </div>
            {
                currentUser && currentUser.photoURL ?
                    <img className="post-image mx-auto" src={currentUser.photoURL} alt='User' />
                : ''
            }
            <hr />
        </div>
    );
};

export default Post;