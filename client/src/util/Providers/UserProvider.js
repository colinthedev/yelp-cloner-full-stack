import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase/firebase.utils";

export const UserContext = createContext({ user: null })

const UserProvider = (props) => {
    const [user, setuser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            const { displayName, email } = user;
            setuser({
                displayName,
                email
            })
        })
    }, [])
    console.log(user)

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )
}

export default UserProvider;

// import React, { useEffect, useContext, useState } from 'react';
// import { UserContext } from './providers/UserProvider';

// const Login = () => {
//     const user = useContext(UserContext)

//     useEffect(() => {
//         if (user) {
//             setredirect('/dashboard')
//         }
//     }, [user])

// }