import React from 'react';
import classes from './FavoriteList.module.css';
import DramaItem from '../DiscoverDramaSection/DramaList/DramaItem/DramaItem';

const FavoriteList = () => {
	return (
		<ul className={classes.favoriteList}>
			{results.map((drama) => {
				return <DramaItem drama={drama} key={drama.id} />;
			})}
		</ul>
	);
};

export default FavoriteList;
