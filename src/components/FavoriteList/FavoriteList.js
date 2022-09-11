import React from 'react';
import classes from './FavoriteList.module.css';
import DramaItem from '../DiscoverDramaSection/DramaList/DramaItem/DramaItem';
import { useSelector } from 'react-redux';

const FavoriteList = () => {
	const favoriteDramas = useSelector((state) => state.dramas.favoriteDramas);
	const isEditFavoriteDramas = useSelector(
		(state) => state.ui.isEditFavoriteDramas
	);
	return (
		<ul
			className={`${classes.favoriteList} ${
				isEditFavoriteDramas && classes.edit
			}`}
		>
			{favoriteDramas.map((drama) => {
				return <DramaItem drama={drama} key={drama.id} />;
			})}
		</ul>
	);
};

export default FavoriteList;
