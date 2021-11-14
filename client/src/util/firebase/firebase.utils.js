import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCZAmbZ9MIJ3YQvtc5eSrIYuNZYFE - l01g",
    authDomain: "yelper-f3b26.firebaseapp.com",
    projectId: "yelper-f3b26",
    storageBucket: "yelper-f3b26.appspot.com",
    messagingSenderId: "806283366694",
    appId: "1:806283366694:web:60a1c71ecfef0b1c0a31e7",
    measurementId: "G-35GW00RJCV"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If user is not signed in do nothing
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        console.log(displayName)
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;