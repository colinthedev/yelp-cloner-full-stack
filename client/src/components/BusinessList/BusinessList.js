import React from "react";
import './BusinessList.css';
import Business from '../Business/Business';

const BusinessList = ({ business }) => {
    console.log(business) 
    return (
        <div className="BusinessList">
            {business.map(business => {
                return <Business key={business.id} business={business} />;
            })}
        </div>
    )
};

export default BusinessList;
