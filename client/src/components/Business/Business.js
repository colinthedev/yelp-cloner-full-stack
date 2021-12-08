import React from "react";
import './Business.css';

import Stars from './img/Stars.svg';

const Business = ({ business }) => {
    console.log(business)
    return (
        <div className="business position-relative d-flex flex-column">
            <div className="image-container">
                <img src={business.imageSrc} alt={business.imageSrc} />
            </div>
            <h2>{business.name}</h2>
            <div className="business-info d-flex flex-column justify-content-between">
                <div className="d-flex flex-column justify-content-between">
                    <p>{business.address}</p>
                    <p>{business.city}&nbsp;{business.state}&nbsp;{business.zipCode}</p>
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <h3 className="reviews-font">{business.category}</h3>
                    <div className="d-flex flex-row">
                        <h3 className="rating">{business.rating} </h3>
                        <img className="d-block mx-2 star-rating" src={Stars} />
                    </div>
                    <p>{business.reviewCount} reviews</p>
                </div>
            </div>
        </div>
    )
};

export default Business;