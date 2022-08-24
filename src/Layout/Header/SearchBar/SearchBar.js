import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import classes from './SearchBar.module.css';

const SearchBar = () => {
	return (
		<div className={classes.searchBar}>
			<input type='text' placeholder='Search K-drama'></input>
			<SearchIcon className={classes.icon} />
		</div>
	);
};

export default SearchBar;
