import React from 'react';
import classes from './NewDramaItem.module.css';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { genres } from '../../../app/dramaSlice';

const NewDramaItem = ({ drama }) => {
	const {
		id,
		name,
		original_name: originalName,
		genre_ids: genreIds,
		poster_path: posterPath,
	} = drama;
	const genresString = genreIds
		.filter((genre) => genres.hasOwnProperty(genre) && genre)
		.map((genre) => genres[genre])
		.join(', ');

	return (
		<SwiperSlide className={classes.newDramaItem}>
			<Link to={`/dramas/${id}`}>
				<div>
					<h3>{name}</h3>
					<h4>{originalName}</h4>
					<p>Genres: {genresString}</p>
				</div>
				<img
					src={
						posterPath === null
							? '/img/no-image.jpeg'
							: `https://image.tmdb.org/t/p/w500/${posterPath}`
					}
					alt='poster'
				/>
				<div className={classes.backdrop}></div>
			</Link>
		</SwiperSlide>
	);
};

export default NewDramaItem;
