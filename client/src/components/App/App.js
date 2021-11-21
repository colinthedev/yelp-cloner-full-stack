import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, createUserProfileDocument } from "../../util/firebase/firebase.utils";
import Navmenu from '../Nav/Nav';
import Home from '../../Pages/Home/Home';
import Signin from '../../Pages/Sign-in/Sign-in';
import Signup from '../../Pages/Sign-up/Sign-up';
import Profile from '../../Pages/Profile/Profile';
import Footer from '../Footer/Footer';


export const UserContext = React.createContext(null)

const App = () => {
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
          })
        })
      } else {
        setuser({ currentUser: userAuth })
      }
    })

    return () => {
      unsubscribeFromAuth();
    };
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={currentUser}>
            <Navmenu  />
            <hr className="p-0 m-0"></hr>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />}  />
              </Routes>
          </UserContext.Provider>
        </BrowserRouter>
        <Footer />
    </div>
  )
}

export default App;
