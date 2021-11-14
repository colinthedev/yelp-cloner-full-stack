import React from 'react';

import './custom-button.css';

const CustomButton = ({ children, noBackground, ...otherProps }) => {
    // console.log('children: ', children);
    // console.log('otherProps: ', otherProps);
    return (
        <button
            className={`${noBackground ? 'no-background' : 'custom-button'}`} {...otherProps}
        >
            {children}
        </button>
    )
};

export default CustomButton;

// return (
//     <button className={`custom-button`} {...otherProps}>
//         {children}
//     </button>
// )

