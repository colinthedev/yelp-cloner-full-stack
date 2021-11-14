import React from 'react';

import FormInput from '../../components/Form-input/form-input';
import CustomButton from '../../components/Custom-button/Custom-button';

import { auth } from '../../util/firebase/firebase.utils';
import { Link } from 'react-router-dom';

import './sign-in.css';
import Stars from './img/Stars.svg';
import Planet from './img/Planet.svg';
import Rocketship from './img/Rocketship.svg';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="d-flex flex-column mb-5">
                <div className="sign-in-top position-relative">
                    <img className="planet-img position-absolute" src={Planet} alt="Planet" />
                    <img className="stars-img position-absolute top-0 left-0 d-block w-100 h-100" src={Stars} alt="Stars" />
                    <img className="position-absolute bottom-0 left-0" src={Rocketship} alt="Rocketship" />
                </div>
                <div className="d-flex flex-column mt-4">
                    <h2 className="sign-in-font-heading">Already have an account?</h2>
                    <span className="sign-in-font mb-1">Sign in here with your email and password.</span>
                    <span className="sign-in-font light-font">Test user - bbp@aol.com password</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required />
                    <div className="d-flex mb-2">
                        <CustomButton type="submit">Blast Off!</CustomButton>
                    </div>
                </form>
                <CustomButton type="button" noBackground>
                    New user ? <a className="underline"><Link to="/signup">Sign up here</Link></a>
                </CustomButton>
            </div>
        )
    }
}

export default SignIn;