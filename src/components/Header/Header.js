import React from 'react';
import classes from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';

const Header = () => {
	return (
		<header className={classes.header}>
			<h1>My K/Dramas</h1>
			<SearchBar />
		</header>
	);
};

export default Header;
