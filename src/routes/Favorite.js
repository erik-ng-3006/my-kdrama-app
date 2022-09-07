import React from 'react';
import { useSelector } from 'react-redux';
//import Button from '../components/UI/Button/Button';

const Favorite = () => {
	const favoriteList = useSelector((state) => state.dramas.favoriteList);
	console.log(favoriteList);
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
