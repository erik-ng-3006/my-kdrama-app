import React from 'react';
import classes from './DramaItem.module.css';
import { Link } from 'react-router-dom';
import { genresList } from '../../../../app/dramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDramaDetail } from '../../../../app/dramaSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFavoriteDrama } from '../../../../app/dramaSlice';

const DramaItem = ({ drama }) => {
	const dispatch = useDispatch();
	const isEditFavoriteDramas = useSelector(
		(state) => state.ui.isEditFavoriteDramas
	);
	const user = useSelector((state) => state.user.user);

	const {
		genre_ids,
		genres,
		id,
		name,
		original_name: originalName,
		poster_path: posterPath,
	} = drama;

	const deleteButtonHandler = () => {
		dispatch(deleteFavoriteDrama([user.uid, id]));
	};
	const genresString =
		genre_ids !== undefined
			? genre_ids
					.filter(
						(genre) => genresList.hasOwnProperty(genre) && genre
					)
					.map((genre) => genresList[genre])
					.join(', ')
			: genres.map((genre) => genre.name).join(', ');

	const itemOnclickHandler = function () {
		dispatch(fetchDramaDetail(id));
	};

	return (
		<li
			className={`${classes.listItem} ${
				isEditFavoriteDramas && classes.toggleDelete
			}`}
			onClick={itemOnclickHandler}
		>
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
			<DeleteIcon onClick={deleteButtonHandler} />
		</li>
	);
};

export default DramaItem;
