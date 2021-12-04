import React, { useState } from "react";
import BusinessList from '../../../src/components/BusinessList/BusinessList';
import SearchBar from '../../../src/components/SearchBar/SearchBar';
import Yelp from '../../Utilities/Api/Yelp';

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


// // NEWEST
// import React, { useState, useEffect } from "react";
// import BusinessList from '../../../src/components/BusinessList/BusinessList';
// import SearchBar from '../../../src/components/SearchBar/SearchBar';
// import Yelp from '../../../src/Utilities/Api/Yelp';

// const Home = (props) => {
//     console.log(props)
//     const [businesses, setBusinesses] = useState([]);
//     const [sortedBusinesses, setSortedBusiness] = useState([]);
//     const [searchSort, setSearchSort] = useState({ sortBy: 'best_match' });
//     const [searchTerm, setSearchTerm] = useState({ term: '' });
//     const [searchLocale, setSearchLocale] = useState({ location: '' });
//     const sortByOptions = {
//         'Best Match': 'best_match',
//         'Highest Rated': 'rating',
//         'Most Reviewed': 'reviewCount'
//     };

//     function getSortByClass(sortByOption) { // Get the sortBy options assign active class to selected opt.
//         if (searchSort.sortBy === sortByOption) {
//             return 'active';
//         }
//         return '';
//     }

//     function renderSortByOptions() { // Return the selected sortBy option and list the options in ul > li
//         return Object.keys(sortByOptions).map(sortByOption => {
//             let sortByOptionValue = sortByOptions[sortByOption];
//             return <li
//                 onClick={() => handleSortByChange(sortByOptionValue)}
//                 className={getSortByClass(sortByOptionValue)}
//                 key={sortByOptionValue}>
//                 {sortByOption}
//             </li>;
//         });
//     }

//     useEffect(() => {
//         let sorted = businesses.map(a => ({ ...a }));
//         sorted.sort((a, b) => (a[searchSort.sortBy] > b[searchSort.sortBy]) ? -1 : 1);
//         setSortedBusiness(sorted);
//     }, [businesses, searchSort.sortBy]);

//     function handleSearch() { // Search Yelp API with a term and location
//         Yelp.searchYelp(searchTerm.term, searchLocale.location);
//         console.log('handleSearch');
//     }

//     function handleSortByChange(sortByOption) { // Take in a sortByOption sets sortBy: to be selected option
//         setSearchSort({ sortBy: sortByOption });
//         console.log('handleSort');
//     }

//     function handleTermChange(event) { // Assigns term to the typed input
//         setSearchTerm({ term: event.target.value });
//         console.log('handleTermChange');
//     }

//     function handleLocationChange(event) { // Assigns location to the typed input
//         setSearchLocale({ location: event.target.value });
//         console.log('handleLocationChange');
//     }

//     // const searchYelp = (term, location, sortBy) => {
//     //     Yelp.searchYelp(term, location, sortBy)
//     //         .then(businesses => {
//     //             setBusinesses(businesses);
//     //         });
//     // };

//     return (
//         <>
//             <SearchBar
//                 renderSortByOptions={renderSortByOptions}
//                 handleSearch={handleSearch}
//                 handleTermChange={handleTermChange}
//                 handleLocationChange={handleLocationChange} 
//                 // searchYelp={searchYelp}
//             />
//             <BusinessList
//                 business={businesses}
//                 sortedBusinesses={sortedBusinesses}
//                 searchSort={searchSort}
//             />
//         </>
//     )
// };

// export default Home;