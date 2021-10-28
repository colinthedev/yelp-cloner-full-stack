import React from 'react';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/yelp';
// import React, { Component } from 'react';
// import React, { useEffect, useState } from 'react'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses })
    })
  }
  render() {
    return (
      <div className="App">
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    )
  }
}

export default App;



















// // TESTING
// function App() {

//   // Prepare state hook for users list
//   const [usersList, setUsersList] = useState([])

//   // Create async function for fetching users list
//   const fetchUsers = async () => {
//     const users = await fetch('/api/hello')
//       .then(res => {
//         console.log(res)
//         return res.json() // Process the incoming data
//       })
//       .then(users => {
//         // Update usersList state
//         console.log(users);
//       })
//     console.log(setUsersList(users))
//   }

//   return (
//     <div className="app">
//       <header className="app-header">

//         {/* Button to fetch users data */}
//         <button onClick={fetchUsers}>Fetch users</button>

//         {/* Display table of users after fetching users data */}
//         {usersList > 0 && <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Username</th>
//               <th>Name</th>
//               <th>Email</th>
//             </tr>
//           </thead>

//           <tbody>
//             {usersList.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.username}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>}
//       </header>
//     </div>
//   )
// }

// export default App;


// TESTING 2
// class App extends Component {
//   constructor() {
//     super();
//     this.state = { users: [] }
//   }
//   componentDidMount() {
//     fetch('/api/hello')
//       .then(res => {
//         console.log(res)
//         return res.json()
//       })
//       .then(users => {
//         console.log(users);
//         this.setState({ users })
//       })
//   }
//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.users.map((user) => {
//           <div key={user.id}>user: {user.name} Password: {user.password}</div>
//         })}
//       </div>
//     )
//   }
// }

// export default App;

// GET
// class App extends Component {

//   state = {
//     renderedResponse: ''
//   }

//   getResponse = async () => {
//     const response = await fetch('/api/hello')
//     const body = await response.json()
//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   }

//   componentDidMount() {
//     this.getResponse()
//       .then(res => {
//         const someData = res;
//         this.setState({ renderedResponse: someData })
//       })
//   }


//   render() {
//     const { renderedResponse } = this.state

//     return (
//       <div className="App">
//         <h2>Call out to API</h2>
//         <p>{renderedResponse.express}</p>
//       </div>
//     )
//   }
// }

// export default App;

// GET AND POST
// import React, { Component } from 'react';

// import './App.css';

// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };

//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   };

//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();

//     this.setState({ responseToPost: body });
//   };

//   render() {
//     return (
//       <div className="App">
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div>
//     );
//   }
// }

// export default App;