import React, {useState} from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpAsync} from '../../redux/user/user.action';
import {connect} from 'react-redux';

const SignUp = (props) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email:'',
        password:'',
        confirmPassword:''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setUserCredentials({...userCredentials, [name]: value});
    }

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert("Password and confirm password are not same");
            return;
        }

        props.signUpAsync(email, password, displayName);
    }

    return (
        <div className="sign-up">
            <h2> I do not have an account</h2>
            <span>Sign up with your Email and Password</span>

            <form 
                className="sign-up-form"
                onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    label="Display Name"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    label="email"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    label="password"
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    label="confirm password"
                    onChange={handleChange}
                    required
                />
                <CustomButton type="submit">
                    Sign Up
                </CustomButton>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpAsync: (email, password, displayName) => dispatch(signUpAsync({email, password, displayName}))
});

export default connect(null, mapDispatchToProps)(SignUp);