import React, { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassWord, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleResponse =(res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

// Sign In With Google
    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }
 
// Sign in with facebook
const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
        handleResponse(res, true);
    })
}

// Sign Out 
    const signOut =() => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value);
            
        }
        if(e.target.name === 'password'){
            const isPasswordsValid =  e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordsValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassWord(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        if(!newUser && user.email && user.password){
           signInWithEmailAndPassword(user.email, user.password)
           .then(res => {
            handleResponse(res, true);
           })
        }
        e.preventDefault();
    }


    
    return (
        <div className="login">
            <h2>Login From</h2>
            <button onClick={googleSignIn}>Sing in</button>
            {/* {
                user.isSignedIn ? <button onClick={signOut}>Sing out</button> :
                <button onClick={googleSignIn}>Sing in</button>
            } */}
            <button onClick={fbSignIn}>Sign in Using Facebook</button>

            {
                user.isSignedIn && <div>
                    <img src={user.photo} alt=""/>
                    <h3><p>Welcome</p>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            }

            <h1>Our Own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser"/>
            <label htmlFor="newUser">New User Sign Up</label>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Enter your Name"/>}
                <br />
                <input type="email" onBlur={handleBlur} name="email" placeholder="Your Email" required/>
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Your Password" required/>
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{color:'red'}}>{user.error}</p>
            {user.success && <p style={{color:'green'}}>User {newUser? 'Created' : 'Logged in' }Successfully</p>}
        </div>
    );
};

export default Login;