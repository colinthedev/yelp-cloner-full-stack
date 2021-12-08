import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import './TimeStamp.css';

const TimeStamp = ({ children, noBackground, ...otherProps }) => {
    // console.log('children: ', children);
    // console.log('otherProps: ', otherProps);
    
    return <ReactTimeAgo className={`${noBackground ? 'no-background' : 'custom-banner'}`} {...otherProps} />
};

export default TimeStamp;