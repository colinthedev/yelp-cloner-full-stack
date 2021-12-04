// // NEW BUT BEFORE FIXING STATE
// import React, { useState } from "react";
// import './SearchBar.css';

// const SearchBar = (props) => {
//     console.log(props)

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

//     function handleSearch(event) { // Search Yelp API with a term and location
//         event.preventDefault()
//         props.searchYelp(searchTerm.term, searchLocale.location);
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

//     return (
//         <div className="SearchBar">
//             {props.searchYelp}
//             <div className="SearchBar-sort-options">
//                 <ul>
//                     {renderSortByOptions(sortByOptions)}
//                 </ul>
//             </div>
//             <div className="SearchBar-fields">
//                 <input
//                     onChange={handleTermChange}
//                     onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
//                     placeholder="Search Businesses"
//                 />
//                 <input
//                     onChange={handleLocationChange}
//                     onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
//                     placeholder="Where?"
//                 />
//                 <button className="SearchBar-submit" onClick={handleSearch}>Let's Go</button>
//             </div>
//         </div>
//     )
// }

// export default SearchBar;




// // NEWEST
// import React, { useState } from "react";
// import BusinessList from '../../../src/components/BusinessList/BusinessList';
// import Yelp from '../../Utilities/Api/Yelp';
// import './SearchBar.css';

// const SearchBar = ({ renderSortByOptions, handleTermChange, handleLocationChange, handleSearch, searchYelp, ...otherProps }) => {

//     return (
//         <div className="SearchBar">
//             {/* {searchYelp} */}
//             {handleSearch}
//             <div className="SearchBar-sort-options">
//                 <ul>
//                     {renderSortByOptions()}
//                 </ul>
//             </div>
//             <div className="SearchBar-fields">
//                 <input
//                     onChange={handleTermChange}
//                     onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
//                     placeholder="Search Businesses"
//                 />
//                 <input
//                     onChange={handleLocationChange}
//                     onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
//                     placeholder="Where?"
//                 />
//                 <button className="SearchBar-submit" onClick={handleSearch}>Let's Go</button>
//             </div>
//         </div>
//     )
// }

// export default SearchBar;



// ORGINAL CLASS VERSION
// import React from 'react';
// import './SearchBar.css';

// class SearchBar extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log(props)
//         this.state = {
//             term: '',
//             location: '',
//             sortBy: 'best_match'
//         }

//         this.handleTermChange = this.handleTermChange.bind(this)
//         this.handleLocationChange = this.handleLocationChange.bind(this)
//         this.handleSearch = this.handleSearch.bind(this)

//         this.sortByOptions = {
//             'Best Match': 'best_match',
//             'Highest Rated': 'rating',
//             'Most Reviewed': 'review_count'
//         };
//     }

//     getSortByClass(sortByOption) {
//         // console.log(sortByOption)
//         if (this.state.sortBy === sortByOption) {
//             return 'active'
//         }
//         return ''
//     }

//     handleSortByChange(sortByOption) {
//         this.setState({
//             sortBy: sortByOption
//         })
//     }

//     handleTermChange(event) {
//         this.setState({
//             term: event.target.value
//         })
//     }

//     handleLocationChange(event) {
//         this.setState({
//             location: event.target.value
//         })
//     }

//     handleSearch(event) {
//         this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
//         event.preventDefault()
//     }

//     renderSortByOptions() {
//         return Object.keys(this.sortByOptions).map(sortByOption => {
//             console.log(sortByOption)
//             let sortByOptionValue = this.sortByOptions[sortByOption]
//             return <li
//                 onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
//                 className={this.getSortByClass(sortByOptionValue)}
//                 key={sortByOptionValue}>
//                 {sortByOption}
//             </li>;
//         })
//     }

//     render() {
//         return (
//             <div className="SearchBar">
//                 {this.searchYelp}
//                 <div className="SearchBar-sort-options">
//                     <ul>
//                         {this.renderSortByOptions()}
//                     </ul>
//                 </div>
//                 <div className="SearchBar-fields">
//                     <input onChange={this.handleTermChange} placeholder="Search Businesses" />
//                     <input onChange={this.handleLocationChange} placeholder="Where?" />
//                     <button className="SearchBar-submit" onClick={this.handleSearch}>Let's Go</button>
//                 </div>
//             </div>
//         )
//     }
// };

// export default SearchBar;




// ORIGINAL FUNCTION VERSION
import React, { useState, useEffect } from "react";
import './SearchBar.css';

const SearchBar = (props) => {
    const [term, setTerm] = useState('')
    const [location, setLocation] = useState('')
    const [sortBy, setSortBy] = useState('best_match')

    const sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
    };

    const handleSortByChange = () => {
        setSortBy(sortBy)
        // console.log(sortByOption)
        console.log(sortBy)
    }

    const renderSortByOptions = (sortByOptions) => {
        // console.log(Object.keys(sortByOptions))
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption]
            // console.log(sortByOptionValue)
            return <li
                className={sortBy === sortByOption ? 'active' : ''}
                onClick={handleSortByChange}
                key={sortByOptionValue}>
                {sortByOption}
            </li>;
        })
    }

    const handleSearch = (event) => {
        event.preventDefault()
        props.searchYelp(term, location)
    }

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    return (
        <div className="SearchBar">
            {props.searchYelp}
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions(sortByOptions)}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input
                    onChange={handleTermChange}
                    onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
                    placeholder="Search Businesses"
                />
                <input
                    onChange={handleLocationChange}
                    onKeyPress={(event) => event.key === 'Enter' && handleSearch(event)}
                    placeholder="Where?"
                />
                <button className="SearchBar-submit" onClick={handleSearch}>Let's Go</button>
            </div>
        </div>
    )
}

export default SearchBar;
