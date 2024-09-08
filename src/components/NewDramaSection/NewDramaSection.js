import React from 'react';
import NewDramaCarousel from './NewDramaCarousel/NewDramaCarousel';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const NewDramaSection = () => {
	const status = useSelector((state) => state.dramas.status);

	return (
		<section id='new-drama-section'>
			<h2>Newest:</h2>
			{status === 'loading' ? (
				<div className='center'>
					<LoadingSpinner />
				</div>
			) : (
				<NewDramaCarousel />
			)}
		</section>
	);
};

export default NewDramaSection;
