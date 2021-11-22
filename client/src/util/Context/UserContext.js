import React, { useContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

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
    let unsubscribeFromAuth = null;

    useEffect(() => {
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
                // setUser({ currentUser: userAuth }) OBJECTS ARE TRUTHY 
            }
        });

        return () => {
            unsubscribeFromAuth();
        };
    }, [])

    const toggleUser = () => {
        auth.signOut()
            .then(() => {
                setUser(null)
            })
            .catch(e => console.log('There was a error:'(e)))
    }
    // console.log(currentUser)

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

    const sliceDisplayName = (currentUser) => {
        if (currentUser) {
            const displayName = currentUser.displayName;
            return (
                width >= 1441 ? displayName.substring(0, 16) + '...'
                    : width <= 1440 && width >= 769 ? displayName.substring(0, 14) + '...'
                        : width <= 768 ? displayName.substring(0, 7) + '...'
                            : displayName
            )
        } else (console.log("No user found :("))
    }
    // console.log(sliceDisplayName(currentUser))

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


// import React, { useContext, useState, useEffect } from 'react';
// import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

// const UserContext = React.createContext(null);
// const UserUpdateContext = React.createContext();
// const UserUpdateNameContext = React.createContext();
// const UserUpdateEmailContext = React.createContext();

// export const useUserContext = () => {
//     // useContext hook 
//     return useContext(UserContext);
// }

// export const useUserContextUpdate = () => {
//     // useContext hook - toggleUser signout function
//     return useContext(UserUpdateContext)
// }

// export const useUserNameUpdate = () => {
//     // useContext hook - update user displayName
//     return useContext(UserUpdateNameContext)
// }

// export const useUserEmailUpdate = () => {
//     // useContext hook - update user email
//     return useContext(UserUpdateEmailContext)
// }

// export const UserContextProvider = ({ children }) => {
//     const [currentUser, setUser] = useState(null);
//     let unsubscribeFromAuth = null;

//     useEffect(() => {
//         unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//             if (userAuth) {
//                 const userRef = await createUserProfileDocument(userAuth);

//                 userRef.onSnapshot(snapShot => {
//                     setUser({
//                         id: snapShot.id,
//                         ...snapShot.data()
//                     });
//                 });
//             } else {
//                 setUser(null)
//                 // setUser({ currentUser: userAuth }) OBJECTS ARE TRUTHY 
//             }
//         });

//         return () => {
//             unsubscribeFromAuth();
//         };
//     }, [])

//     const toggleUser = () => {
//         auth.signOut()
//             .then(() => {
//                 setUser(null)
//             })
//             .catch(e => console.log('There was a error:'(e)))
//     }
//     // console.log(currentUser)

//     const useWindowWidth = () => {
//         const [width, setWidth] = useState(window.innerWidth)
//         useEffect(() => {
//             const handleResize = () => setWidth(window.innerWidth)
//             window.addEventListener('resize', handleResize)
//             return () => {
//                 window.removeEventListener('resize', handleResize)
//             }
//         })
//         return width
//     }
//     const width = useWindowWidth();

//     const sliceDisplayName = (currentUser) => {
//         if (currentUser) {
//             const tester = currentUser.displayName;
//             return (
//                 width < 1440 && width >= 769 ? tester.substring(0, 14)
//                     : width <= 768 ? tester.substring(0, 8)
//                         : tester
//             )

//             // if (width < 1440 && width >= 769) {
//             //     return tester.substring(0, 14)
//             // } else if (width <= 768) {
//             //     return tester.substring(0, 8)
//             // } else {
//             //     return tester
//             // }
//         } else (console.log("No user found :("))
//         return currentUser
//     }
//     // console.log(sliceDisplayName(currentUser))

//     const sliceEmail = (currentUser) => {
//         if (currentUser) {
//             const email = currentUser.email;
//             if (width < 1440 && width >= 769) {
//                 return email.substring(0, 14)
//             } else if (width <= 768) {
//                 return email.substring(0, 8)
//             } else {
//                 return email
//             }
//         } else (console.log("No user found :("))
//     }
//     // console.log(sliceEmail(currentUser))

//     return (
//         <UserContext.Provider value={currentUser} >
//             <UserUpdateContext.Provider value={toggleUser} >
//                 <UserUpdateNameContext.Provider value={sliceDisplayName} >
//                     <UserUpdateEmailContext.Provider value={sliceEmail} >
//                         {children}
//                     </UserUpdateEmailContext.Provider >
//                 </UserUpdateNameContext.Provider >
//             </UserUpdateContext.Provider >
//         </UserContext.Provider >
//     )
// };





// import React, { useContext, useState, useEffect } from 'react';
// import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

// const UserContext = React.createContext(null);
// const UserUpdateContext = React.createContext();

// export const useUserContext = () => {
//     // useContext hook 
//     return useContext(UserContext);
// }

// export const useUserContextUpdate = () => {
//     // useContext hook 
//     return useContext(UserUpdateContext)
// }

// export const UserContextProvider = ({ children }) => {
//     const [currentUser, setUser] = useState(null);
//     let unsubscribeFromAuth = null;

//     useEffect(() => {
//         unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//             if (userAuth) {
//                 const userRef = await createUserProfileDocument(userAuth);

//                 userRef.onSnapshot(snapShot => {
//                     setUser({
//                         id: snapShot.id,
//                         ...snapShot.data()
//                     });
//                 });
//             } else {
//                 setUser(null)
//                 // setUser({ currentUser: userAuth }) OBJECTS ARE TRUTHY 
//             }
//         });

//         return () => {
//             unsubscribeFromAuth();
//         };
//     }, [])

//     const toggleUser = () => {
//         auth.signOut()
//             .then(() => {
//                 setUser(null)
//             })
//             .catch(e => console.log('There was a error:'(e)))
//     }
//     console.log(currentUser)

//     return (
//         <UserContext.Provider value={currentUser} >
//             <UserUpdateContext.Provider value={toggleUser} >
//                 {children}
//             </UserUpdateContext.Provider >
//         </UserContext.Provider >
//     )
// };