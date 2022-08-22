import React from 'react';
import classes from './DramaItem.module.css';
import { genres } from '../../../../app/dramaSlice';

const DramaItem = ({ drama }) => {
	const { genre_ids, name, original_name, poster_path } = drama;
	const genresString = genre_ids
		.filter((genre) => genres.hasOwnProperty(genre) && genre)
		.map((genre) => genres[genre])
		.join(', ');

	return (
		<li className={classes.listItem}>
			<div>
				<h3>{name}</h3>
				<h4>{original_name}</h4>
				<p>Genres: {genresString}</p>
			</div>
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				alt='drama poster'
			/>
			<div className={classes.backdrop}></div>
		</li>
	);
};

export default DramaItem;
