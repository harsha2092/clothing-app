import React from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state={
            displayName: '',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const {displayName, email, password, confirmPassword} = this.state;
        console.log(this.state);
        if(password !== confirmPassword){
            alert("Password and confirm password are not same");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email:'',
                password:'',
                confirmPassword:''
            });

        }catch(error){
            console.log("cannot create user");
        }
    }

    render(){
        return (
            <div className="sign-up">
                <h2> I do not have an account</h2>
                <span>Sign up with your Email and Password</span>

                <form 
                    className="sign-up-form"
                    onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        label="Display Name"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="email"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        label="password"
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        label="confirm password"
                        onChange={this.handleChange}
                        required
                    />
                    <CustomButton type="submit">
                        Sign Up
                    </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;