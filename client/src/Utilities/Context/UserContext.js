import React, { useContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from "../Firebase/Firebase.utils";

const UserContext = React.createContext(null);
const UserUpdateContext = React.createContext();
const UserUpdateNameContext = React.createContext();
const UserUpdateEmailContext = React.createContext();

export const useUserContext = () => {
    // useContext hook 
    return useContext(UserContext);
}

export const useUserContextUpdate = () => {
    // useContext hook - toggleUser signout function
    return useContext(UserUpdateContext)
}

export const useUserNameUpdate = () => {
    // useContext hook - update user displayName
    return useContext(UserUpdateNameContext)
}

export const useUserEmailUpdate = () => {
    // useContext hook - update user email
    return useContext(UserUpdateEmailContext)
}

export const UserContextProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);
    // let unsubscribeFromAuth = null; // moved into useEffect per terminal error

    useEffect(() => {
        let unsubscribeFromAuth = null;
        unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            } else {
                setUser(null)
            }
        });

        return () => {
            unsubscribeFromAuth();
        };
    }, [])
    // console.log(unsubscribeFromAuth)

    const toggleUser = () => {
        auth.signOut()
            .then(() => {
                setUser(null)
            })
            .catch(e => console.log('There was a error:'(e)))
    }
    // console.log(currentUser)

    // Get current window width
    const useWindowWidth = () => {
        const [width, setWidth] = useState(window.innerWidth)
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        })
        return width
    }
    const width = useWindowWidth();

    // Slice off end of displayName if reaches a certain length
    const sliceDisplayName = (currentUser) => {
        if (currentUser) {
            const displayName = currentUser.displayName;
            return (
                width >= 1441 ? displayName.substring(0, 16) 
                    : width <= 1440 && width >= 769 ? displayName.substring(0, 14) 
                        : width <= 768 ? displayName.substring(0, 7) + '...'
                            : displayName
            )
        } else (console.log("No user found :("))
    }
    // console.log(sliceDisplayName(currentUser))

    // Slice off end of email if reaches a certain length
    const sliceEmail = (currentUser) => {
        if (currentUser) {
            const email = currentUser.email;
            return (
                width >= 1441 ? email.substring(0, 16) + '...'
                    : width <= 1440 && width >= 769 ? email.substring(0, 14) + '...'
                        : width <= 768 ? email.substring(0, 7) + '...'
                            : email
            )
        } else (console.log("No user found :("))
    }
    // console.log(sliceEmail(currentUser))

    return (
        <UserContext.Provider value={currentUser} >
            <UserUpdateContext.Provider value={toggleUser} >
                <UserUpdateNameContext.Provider value={sliceDisplayName} >
                    <UserUpdateEmailContext.Provider value={sliceEmail} >
                        {children}
                    </UserUpdateEmailContext.Provider >
                </UserUpdateNameContext.Provider >
            </UserUpdateContext.Provider >
        </UserContext.Provider >
    )
};