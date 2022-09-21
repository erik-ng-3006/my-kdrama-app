import React from 'react';
import TrendingDramaCarousel from './TrendingDramaCarousel/TrendingDramaCarousel';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const TrendingDramaSection = () => {
	const status = useSelector((state) => state.dramas.status);

	return (
		<section id='trending-section' className='mg-bt-md'>
			<h2>Trending:</h2>
			{status === 'loading' ? (
				<div className='center'>
					<LoadingSpinner />
				</div>
			) : (
				<TrendingDramaCarousel />
			)}
		</section>
	);
};

export default TrendingDramaSection;
