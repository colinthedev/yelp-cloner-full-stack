import React from 'react';
import BusinessList from '../../../src/components/BusinessList/BusinessList';
import SearchBar from '../../../src/components/SearchBar/SearchBar';
import Yelp from '../../util/yelp';

class Home extends React.Component {
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
            <>
                <SearchBar searchYelp={this.searchYelp} />
                <BusinessList businesses={this.state.businesses} />
            </>
        )
    }
}

export default Home;