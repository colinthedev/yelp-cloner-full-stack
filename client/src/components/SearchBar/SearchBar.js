// import React from 'react';
// import './SearchBar.css';

// class SearchBar extends React.Component {
//     constructor(props) {
//         super(props);
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
//             let sortByOptionValue = this.sortByOptions[sortByOption]
//             console.log(sortByOptionValue)
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

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        props.searchYelp(term, location)
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
                    placeholder="Search Businesses"
                />
                <input
                    onChange={handleLocationChange}
                    placeholder="Where?"
                />
                <button className="SearchBar-submit" onClick={handleSearch}>Let's Go</button>
            </div>
        </div>
    )
}

export default SearchBar;
