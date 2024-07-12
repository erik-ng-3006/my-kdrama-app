import React from 'react';
import classes from './SearchItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDramaDetail } from '../../../../../../app/dramaSlice';

const SearchItem = ({ drama }) => {
	const dispatch = useDispatch();
	const { id, name, poster_path: posterPath } = drama;

	const source = !posterPath
		? '/img/no-image-2.jpeg'
		: `https://image.tmdb.org/t/p/w500/${posterPath}`;

	const itemClickHandler = () => {
		dispatch(fetchDramaDetail(id));
	};

	return (
		<li className={classes.searchItem} onClick={itemClickHandler}>
			<Link to={`/dramas/${id}`}>
				<img src={source} alt='poster' />
				<h3>{name}</h3>
			</Link>
		</li>
	);
};

export default SearchItem;
