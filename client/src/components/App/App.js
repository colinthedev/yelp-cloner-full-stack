import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navmenu from '../Nav/Nav';
import Signin from '../../Pages/Sign-in/Sign-in';
import Signup from '../../Pages/Sign-up/Sign-up';
import Home from '../../Pages/Home/Home';
import Footer from '../Footer/Footer';

import { auth, createUserProfileDocument } from '../../util/firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  //onAuthStateChanged returns method from firebase.Unsubscribe
  componentDidMount() { // firebase call auth from firebase.utils
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navmenu currentUser={this.state.currentUser} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App;






// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import React, { useState, useEffect} from "react";
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Navmenu from '../Nav/Nav';
// import Signin from '../../Pages/Sign-in/Sign-in';
// import Signup from '../../Pages/Sign-up/Sign-up';
// import Home from '../../Pages/Home/Home';
// import Footer from '../Footer/Footer';

// import { auth, createUserProfileDocument } from '../../util/firebase/firebase.utils';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null)

//   let unsubscribeFromAuth = null;
  
//   //onAuthStateChanged returns method from firebase.Unsubscribe
//   useEffect((currentUser) => {
//     unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);

//         userRef.onSnapshot(snapShot => {
//           setCurrentUser({
//             currentUser: {
//               id: snapShot.id,
//               ...snapShot.data()
//             }
//           });
//           console.log(setCurrentUser)
//         });
//       } else {
//         setCurrentUser({ currentUser: userAuth })
//       }
//     })
//     return () => {
//       auth = auth.unsubscribeFromAuth();
//     }
//   }, [])

//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Navmenu currentUser={currentUser} />
//         <Routes>
//           <Route exact path='/' element={<Home />} />
//           <Route path='/signin' element={<Signin />} />
//           <Route path='/signup' element={<Signup />} />
//         </Routes>
//       </BrowserRouter>
//       <Footer />
//     </div>
//   )
// }

// export default App;

// Home -> SearchBar
    //  -> BusinessList

