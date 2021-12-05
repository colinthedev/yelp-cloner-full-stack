// Working version but w.o filtering
import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = (props) => {
    console.log(props)
    const [searchSort, setSearchSort] = useState({ sortBy: 'best_match' });
    const [searchTerm, setSearchTerm] = useState({ term: '' });
    const [searchLocale, setSearchLocale] = useState({ location: '' });
    const sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'reviewCount'
    };

    function getSortByClass(sortByOption) { // Get the sortBy options assign active class to selected opt.
        if (searchSort.sortBy === sortByOption) {
            return 'active';
        }
        return '';
    }

    function renderSortByOptions() { // Return the selected sortBy option and list the options in ul > li
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li
                onClick={() => handleSortByChange(sortByOptionValue)}
                className={getSortByClass(sortByOptionValue)}
                key={sortByOptionValue}>
                {sortByOption}
            </li>;
        });
    }

    function handleSearch(event) { // Search Yelp API with a term and location
        event.preventDefault()
        props.searchYelp(searchTerm.term, searchLocale.location);
        console.log('handleSearch');
    }

    function handleSortByChange(sortByOption) { // Take in a sortByOption sets sortBy: to be selected option
        setSearchSort({ sortBy: sortByOption });
        console.log('handleSort');
    }

    function handleTermChange(event) { // Assigns term to the typed input
        setSearchTerm({ term: event.target.value });
        console.log('handleTermChange');
    }

    function handleLocationChange(event) { // Assigns location to the typed input
        setSearchLocale({ location: event.target.value });
        console.log('handleLocationChange');
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
