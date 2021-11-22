import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from '../../../src/util/Context/UserContext'

import Navmenu from '../Nav/Nav';
import Home from '../../Pages/Home/Home';
import Signin from '../../Pages/Sign-in/Sign-in';
import Signup from '../../Pages/Sign-up/Sign-up';
import Profile from '../../Pages/Profile/Profile';
import Footer from '../Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Navmenu />
          <hr className="p-0 m-0"></hr>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <Footer />
        </UserContextProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;
