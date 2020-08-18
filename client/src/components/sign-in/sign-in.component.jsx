import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {signInWithGoogleAsync, signInWithEmailAsync} from '../../redux/user/user.action';

import './sign-in.styles.scss';

const SignIn = (props) => {
    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

    const handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = userCredentials;
        props.signInWithEmailAsync({
            email: email,
            password: password
        });
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={userCredentials.email}
                    handleChange={handleChange} 
                    label="email"
                    required
                        />

                <FormInput 
                    name="password" 
                    type="password" 
                    value={userCredentials.password} 
                    handleChange={handleChange}
                    label="Password"
                    required />

                <div className="buttons">    
                    <CustomButton type="submit">
                        Sign in
                    </CustomButton>

                    <CustomButton
                    type="button"
                    onClick={props.signInWithGoogleAsync}
                    isGoogleSignIn={true}>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signInWithGoogleAsync: () => dispatch(signInWithGoogleAsync()),
    signInWithEmailAsync: (emailAndPassword) => dispatch(signInWithEmailAsync(emailAndPassword))
})


export default connect(null, mapDispatchToProps)(SignIn);