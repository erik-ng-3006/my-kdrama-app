import React from 'react';
import classes from './SearchList.module.css';
import SearchItem from './SearchItem/SearchItem';

const SearchList = ({ dramas }) => {
	return (
		<ul className={classes.searchList}>
			{dramas &&
				dramas.slice(0, 5).map((drama) => {
					return <SearchItem key={drama.id} drama={drama} />;
				})}
		</ul>
	);
};

export default SearchList;
