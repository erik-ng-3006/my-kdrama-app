import React, { useMemo } from 'react';
import classes from './DramaSection.module.css';
import Rating from '@mui/material/Rating';
import HeartButton from '../../UI/HeartButton/HeartButton';

import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteDrama, updateFavoriteDrama } from '../../../app/dramaSlice';
import { toggleModal } from '../../../app/uiSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

const DramaSection = ({ detail }) => {
	const dispatch = useDispatch();

	const favoriteDramas = useSelector((state) => state.dramas.favoriteDramas);

	const loggedUser = JSON.parse(localStorage.getItem('user'));

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
	const isOnFavoriteList = useMemo(
		() => favoriteDramas.some((drama) => drama.id === id),
		[favoriteDramas, id]
	);
	//Add drama to firestore
	const favoriteButtonClickHandler = async () => {
		if (loggedUser) {
			const docRef = doc(db, 'user', loggedUser.uid);
			const docSnap = await getDoc(docRef);
			const convertedData = { [id]: { ...detail } };

			if (docSnap.exists()) {
				dispatch(updateFavoriteDrama([convertedData, loggedUser.uid]));
			} else {
				dispatch(addFavoriteDrama([convertedData, loggedUser.uid]));
			}
		} else {
			dispatch(toggleModal());
		}
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
