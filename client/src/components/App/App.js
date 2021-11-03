import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/yelp';
import Navmenu from '../Nav/Nav';
import Footer from '../Footer/Footer';
// import React, { Component } from 'react';
// import React, { useEffect, useState } from 'react'


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
        <Navmenu />
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
        <Footer />
      </div>
    )
  }
}

export default App;