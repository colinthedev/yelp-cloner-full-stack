import React from 'react';

import './form-input.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    // console.log(handleChange)
    // console.log(label)
    // console.log(otherProps)
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {label ?
                (<label className={`${otherProps.value ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>)
                : null}
        </div>
            
    )
};

export default FormInput;