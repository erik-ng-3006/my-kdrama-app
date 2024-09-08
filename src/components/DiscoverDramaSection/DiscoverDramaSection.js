import React from 'react';
import DramaList from './DramaList/DramaList';
import { useDispatch, useSelector } from 'react-redux';
import { DISCOVER_API_URL } from '../../api/api';
import { fetchDramas } from '../../app/dramaSlice';
import Button from '../UI/Button/Button';
import classes from './DiscoverDramaSection.module.css';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const DiscoverDramaSection = () => {
	const dramas = useSelector((state) => state.dramas.dramas);
	const status = useSelector((state) => state.dramas.status);
	const dispatch = useDispatch();
	const { page, total_page: totalPage } = dramas;
	const btnClickHandler = () => {
		const url =
			DISCOVER_API_URL + `&page=${page === totalPage ? 1 : page + 1}`;

		dispatch(fetchDramas(url));
	};

	return (
		<section className={classes.discoverDramaSection} id='discover-section'>
			<h2>Discover:</h2>
			{status === 'loading' ? (
				<div className='center'>
					<LoadingSpinner />
				</div>
			) : (
				<DramaList />
			)}
			<div className='center'>
				<a href='#discover-section'>
					<Button onClick={btnClickHandler}>Show more</Button>
				</a>
			</div>
		</section>
	);
};

export default DiscoverDramaSection;
