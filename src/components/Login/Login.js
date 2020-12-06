import React, { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

// Sign In With Google
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, photoURL, email} = res.user;
            const signInUser ={
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signInUser);
            console.log(displayName, photoURL, email);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    }
// Sign in with facebook
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(res =>{
            const {displayName, photoURL, email} = res.user;
            const signInUser ={
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signInUser);
            console.log(displayName, photoURL, email);
            // ...
          }).catch(err => {
            // Handle Errors here.
            console.log(err);
            console.log(err.message);
            // ...
          });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const signOutUser ={
                isSignedIn: false,
                newUser: false,
                name: '',
                email: '',
                password: '',
                photo: '',
                error: '',
                success: false
            }
            setUser(signOutUser);
          })
          .catch(err => {
            console.log(err);
          });
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
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name)
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
    // ..
  });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                
            });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        })
        .then(() => {
            console.log("user bane updated successfully")
        
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return (
        <div className="login">
            <h2>Login From</h2>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sing out</button> :
                <button onClick={handleSignIn}>Sing in</button>
            }
            <button onClick={handleFbSignIn}>Sign in Using Facebook</button>

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