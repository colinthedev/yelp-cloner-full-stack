import React, { useState, useEffect } from "react";
import BusinessList from '../../../src/components/BusinessList/BusinessList';
import SearchBar from '../../../src/components/SearchBar/SearchBar';
import Yelp from '../../util/Api/yelp';

const Home = () => {
    const [businesses, setBusinesses] = useState([]);

    const searchYelp = (term, location) => {
        Yelp.searchYelp(term, location)
            .then(businesses => {
                setBusinesses(businesses);
            });
    };

    return (
        <>
            <SearchBar searchYelp={searchYelp} />
            <BusinessList business={businesses} />
        </>
    )
};

export default Home;