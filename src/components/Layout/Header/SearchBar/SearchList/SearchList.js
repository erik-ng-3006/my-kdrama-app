import React, { forwardRef } from 'react';
import classes from './SearchList.module.css';
import SearchItem from './SearchItem/SearchItem';

const SearchList = forwardRef(({ dramas, setIsShowSearchList }, ref) => {
	return (
		<ul ref={ref} className={classes.searchList}>
			{dramas &&
				dramas.slice(0, 5).map((drama) => {
					return (
						<SearchItem
							key={drama.id}
							drama={drama}
							setIsShowSearchList={setIsShowSearchList}
						/>
					);
				})}
		</ul>
	);
});

export default SearchList;
