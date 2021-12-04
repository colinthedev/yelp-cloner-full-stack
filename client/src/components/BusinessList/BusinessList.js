import React from "react";
import './BusinessList.css';
import Business from '../Business/Business';

const BusinessList = ({ business }) => {
    // console.log(business) 
    return (
        <div className="BusinessList">
            {business.map(business => {
                return <Business key={business.id} business={business} />;
            })}
        </div>
    )
};

export default BusinessList;


// // NEWEST
// import React from "react";
// import './BusinessList.css';
// import Business from '../Business/Business';

// const BusinessList = ({ business, sortedBusinesses, searchSort }) => {
//     console.log(business, sortedBusinesses, searchSort) 
//     return (
//         <div className="BusinessList">
//             {searchSort === 'best_match' ?
//                 business.map(business => {
//                     return <Business key={business.id} business={business} />;
//                 })
//                 :
//                 sortedBusinesses.map(business => {
//                     return <Business key={business.id} business={business} />;
//                 })
//             }
//         </div>
//     )
// };

// export default BusinessList;
