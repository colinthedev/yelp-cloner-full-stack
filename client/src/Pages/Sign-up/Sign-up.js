import React, { useState } from 'react';

import FormInput from '../../components/Form-input/form-input';
import CustomButton from '../../components/Custom-button/Custom-button';

import { auth, createUserProfileDocument } from '../../Utilities/Firebase/Firebase.utils';
import { Link } from 'react-router-dom';

import './sign-up.css';
import Stars from './img/Stars.svg';
import Planet from './img/Planet.svg';
import Rocketship from './img/Rocketship.svg';
import Moon from './img/Moon.svg';

const initialValues = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
};

const SignUp = () => {
    const [values, setValues] = useState(initialValues);

    const handleSubmit = async event => {
        event.preventDefault();

        if (values.password !== values.confirmPassword) {
            alert('Passwords dont match')
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(values.email, values.password)
            const displayName = values.displayName
            await createUserProfileDocument(user, {displayName})
            setValues(initialValues)
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div className="d-flex flex-column mb-5">
            <div className="sign-in-top position-relative">
                <img className="planet-img position-absolute" src={Planet} alt="Planet" />
                <img className="stars-img position-absolute top-0 left-0 d-block w-100 h-100" src={Stars} alt="Stars" />
                <img className="rocket-img position-absolute" src={Rocketship} alt="Rocketship" />
                <img className="moon-img position-absolute left-0" src={Moon} alt="Moon" />
            </div>
            <div className="d-flex flex-column mt-4">
                <h2 className="sign-in-font-heading">New user?</h2>
                <span className="sign-in-font mb-1">Sign up here with your email and password.</span>
            </div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={values.displayName}
                    handleChange={handleInputChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleInputChange}
                    label="Email"
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleInputChange}
                    label="Password"
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    handleChange={handleInputChange}
                    label="Confirm Password"
                    required
                />
                <div className="d-flex mb-2">
                    <CustomButton type="submit">Blast Off!</CustomButton>
                </div>
            </form>
            <CustomButton type="button" noBackground>
                Already a user ? <a className="underline"><Link to="/signin">Sign in here</Link></a>
            </CustomButton>
        </div>
    )
}

export default SignUp;