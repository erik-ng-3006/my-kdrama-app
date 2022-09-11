import React from 'react';
import classes from './DramaSection.module.css';
import Rating from '@mui/material/Rating';
import HeartButton from '../../UI/HeartButton/HeartButton';

import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteItem } from '../../../app/dramaSlice';

const DramaSection = ({ detail }) => {
	const dispatch = useDispatch();

	const favoriteDramas = useSelector((state) => state.dramas.favoriteDramas);

	const {
		id,
		name,
		original_name: originalName,
		overview,
		poster_path: posterPath,
		vote_average: rating,
		genres = [],
	} = detail;
	//const genres = detail.genres || [];

	const convertedRating = parseInt((rating / 2).toFixed(1));

	//Check if the drama is already on the favorite list
	const isOnFavoriteList = favoriteDramas.some((drama) => drama.id === id);
	console.log(isOnFavoriteList);

	//Add drama to firestore
	const favoriteButtonClickHandler = async () => {
		dispatch(addFavoriteItem(detail, id));
	};

	return (
		<section className={classes.dramaSection}>
			<HeartButton
				isChecked={isOnFavoriteList}
				onClick={favoriteButtonClickHandler}
			/>
			<img
				src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
				alt='drama poster'
			></img>
			<div>
				<h3>{name}</h3>
				<h4>{originalName}</h4>
				<Rating
					className='mg-bt-sm'
					readOnly
					name='drama-rating'
					value={convertedRating}
					precision={0.1}
					sx={{
						fontSize: '3rem',
						boxShadow:
							'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
					}}
				/>
				<ul>
					{genres.map((genre) => {
						return <li key={genre.id}>{genre.name}</li>;
					})}
				</ul>
				<div>
					<p>{overview}</p>
				</div>
			</div>
		</section>
	);
};

export default DramaSection;
