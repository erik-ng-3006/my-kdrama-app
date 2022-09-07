import React from 'react';
import classes from './DramaItem.module.css';
import { genres } from '../../../../app/dramaSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDramaDetail } from '../../../../app/dramaSlice';

const DramaItem = ({ drama }) => {
	const dispatch = useDispatch();

	const {
		genre_ids,
		id,
		name,
		original_name: originalName,
		poster_path: posterPath,
	} = drama;

	const genresString = genre_ids
		.filter((genre) => genres.hasOwnProperty(genre) && genre)
		.map((genre) => genres[genre])
		.join(', ');

	const itemOnclickHandler = function () {
		dispatch(fetchDramaDetail(id));
	};

	return (
		<li className={classes.listItem} onClick={itemOnclickHandler}>
			<Link to={`/dramas/${id}`}>
				<div>
					<h3>{name}</h3>
					<h4>{originalName}</h4>
					<p>Genres: {genresString}</p>
				</div>
				<img
					src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
					alt='drama poster'
				/>
				<div className={classes.backdrop}></div>
			</Link>
		</li>
	);
};

export default DramaItem;
