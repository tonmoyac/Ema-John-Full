import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

export const initializeLoginFramework = () => {

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
// Sign In With Google
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
        const {displayName, photoURL, email} = res.user;
        const signInUser ={
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true
        }
        return signInUser;
    })
    .catch(err => {
        console.log(err);
        console.log(err.message);
    })
}

// Sign in with facebook
export const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
       return firebase.auth().signInWithPopup(fbProvider)
        .then(res =>{
            const {displayName, photoURL, email} = res.user;
            const signInUser ={
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signInUser;
          }).catch(err => {
            // Handle Errors here.
            console.log(err);
            console.log(err.message);
            // ...
          });
    }

export const handleSignOut = () => { 
   return firebase.auth().signOut()
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
        return signOutUser;
      })
      .catch(err => {
        console.log(err);
      });
}

// Sign In with email And pass word
export const createUserWithEmailAndPassWord = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const newUserInfo = res.user;
                newUserInfo.error = '';
                newUserInfo.success = true;
                updateUserName(name);
                return newUserInfo;
            })
            .catch((error) => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo;
            });
}

// Sign Out With email And PassWord
export const signInWithEmailAndPassword = (email, password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        
    });
}

// Update User Name
export const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    })
    .then(() => {
        console.log("user Nae updated successfully")
    
    })
    .catch(err => {
        console.log(err);
    });
}