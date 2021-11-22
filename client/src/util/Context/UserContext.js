import React, { useContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

const ThemeContext = React.createContext(null);

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ( {children} ) => {
    const [currentUser, setuser] = useState(null);
    let unsubscribeFromAuth = null;

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setuser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            } else {
                setuser({ currentUser: userAuth })
            }
        });

        return () => {
            unsubscribeFromAuth();
        };
    }, [])

    return (
        <ThemeContext.Provider value={currentUser} >
            {children}
        </ThemeContext.Provider >
    )
}