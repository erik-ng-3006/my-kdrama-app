import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DISCOVER_API_URL } from '../api/api';
import { fetchDramas } from '../app/dramaSlice';
import DramaList from '../components/DramaList/DramaList';
import NewDramaCarousel from '../components/NewDramaCarousel/NewDramaCarousel';
import TrendingDramaCarousel from '../components/TrendingDramaCarousel/TrendingDramaCarousel';
import Button from '../components/UI/Button/Button';
const Home = () => {
	const dramas = useSelector((state) => state.dramas.dramas);
	const dispatch = useDispatch();

	const btnClickHandler = () => {
		const url = DISCOVER_API_URL + `&page=${dramas.page + 1}`;

		dispatch(fetchDramas(url));
	};

	return (
		<>
			<h2>Trending drama:</h2>
			<TrendingDramaCarousel />
			<h2>Newest drama:</h2>
			<NewDramaCarousel />
			<DramaList />
			<div className='center'>
				<a href='#discover-section'>
					<Button onClick={btnClickHandler}>Show more</Button>
				</a>
			</div>
		</>
	);
};

export default Home;
