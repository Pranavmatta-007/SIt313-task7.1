import React, { useState } from 'react'
import "./LoginPage.css"
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { signInWithGooglePopup, createUserDocFromAuth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginF = (props) => {


    const navigate = useNavigate();
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
        navigate('/Login/Signed-in');
    }

    const [errorMessage, setErrorMessage] = useState('');

    const [contact, setContact] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const handleLogin = async () => {
        try {
            console.log('Tying to Log in user:', contact.email);
            const emailPassword = firebase.auth().signInWithEmailAndPassword(contact.email, contact.password);
            console.log('User has signed in:', (await emailPassword).user.email);
            navigate('/Login/Signed-in');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('The email you entered is INVALID');
            } else if (error.code === 'auth/wrong-password'){
              setErrorMessage('The password you entered is INVALID');
            } else {
                setErrorMessage('An error occurred while logging you in');
            }
        }
    }


    return (
        <>
            <div className='Sign-container'>
                <Link to='Sign-up'>Sign up</Link>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className='container'>
                <div className='text'>Your email</div>
                <input name='email' type="email" value={contact.email}
              onChange={handleChange}/>
            </div>
            <div className='container'>
                <div className='text'>Your password</div>
                <input name='password' type="password"value={contact.password}
              onChange={handleChange} />
            </div>
            <div className='button-container'>
                <button type='submit' onClick={handleLogin}>Login</button>
            </div>

        </>
    );
}
export default LoginF;