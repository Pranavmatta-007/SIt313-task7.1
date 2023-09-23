import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import "./Sign-up.css"
// import {useUserAuth} from "../context/UserAuthcontext"
import firebase from 'firebase/compat/app';
import { createUserDocFromAuth } from '../firebase';
import 'firebase/compat/auth';

import {useNavigate} from 'react-router-dom';
const Sign=(props)=>{

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const [contact, setContact] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {displayName,email,password,confirmPassword} =contact

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        if (contact.password !== contact.confirmPassword) {
            setErrorMessage('Passwords do not Match!!');
        } else {
            setErrorMessage('');
            try {
                console.log('Creating user:', contact.email);
                const usernamePassword = await firebase.auth().createUserWithEmailAndPassword(contact.email, contact.password);
                console.log('User created:', (await usernamePassword).user.email);
                navigate('/Login');
                await createUserDocFromAuth(usernamePassword,{displayName})
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
        
        
    //     await addDoc(collection(mycollection,documentId),{
    //         name: contact.displayName,
    //         email: contact.email
    //     }).then(function(res){
    //         alert("Data is succesfully added")
    //     }).catch(function(err){
    //         alert("error occured")
    //     })
    };

    

    return(
        <>
        <div className='Sign-container'>
            <Link to='../Login'>Sign in</Link>
        </div>
        <h1>Create a DEV@Deakin Account</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className='containnner'>
            <span className='texts'>Name*</span>
            <input name = "displayName"type="text" value={contact.displayName}
                onChange={handleChange}/>
        </div>
        <div className='containnner'>
            <span className='texts'>Email*</span>
            <input name='email' type="email" value={contact.email}
                onChange={handleChange}/>
        </div>
        <div className='containnner'>
            <span className='texts'>Password*</span>
            <input name='password' type="password" value={contact.password}
                onChange={handleChange}/>
        </div>
        <div className='containnner'>
            <span className='texts'>Confirm Password*</span>
            <input name='confirmPassword' type="password" value={contact.confirmPassword}
                onChange={handleChange}/>
        </div>
        <div className='button-container'>
            <button type = 'submit' onClick={handleSignup}>Sign-Up</button>
        </div>
        </>
    );
}

export default Sign;