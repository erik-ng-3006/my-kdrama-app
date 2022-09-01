import React from 'react';
import TrendingDramaCarousel from './TrendingDramaCarousel/TrendingDramaCarousel';

const TrendingDramaSection = () => {
	return (
		<section id='trending-section' className='mg-bt-md'>
			<h2>Trending:</h2>
			<TrendingDramaCarousel />
		</section>
	);
};

export default TrendingDramaSection;
