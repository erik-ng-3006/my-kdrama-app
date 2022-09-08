import React, { useEffect } from 'react';
//import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
//import Button from '../components/UI/Button/Button';

const Favorite = () => {
	//const favoriteList = useSelector((state) => state.dramas.favoriteList);
	useEffect(() => {
		const getFavoriteData = async () => {
			const querySnapshot = await getDocs(
				collection(db, 'favorite-dramas')
			);
			console.log(querySnapshot);
		};
		getFavoriteData();
	});
	return (
		<section>
			{/* 	<div style={{ textAlign: 'center' }}>
				<p className='mg-bt-md'>
					There is no drama on your list yet!!!
				</p>
				<Button>Add drama</Button>
			</div> */}
			<h2>Wishlist</h2>
		</section>
	);
};

export default Favorite;
