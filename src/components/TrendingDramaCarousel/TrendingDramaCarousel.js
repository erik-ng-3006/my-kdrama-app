import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDramaDetail, genres } from '../../app/dramaSlice';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import classes from './TrendingDramaCarousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

const TrendingDramaCarousel = () => {
	const trendingDramas = useSelector((state) => state.dramas.trendingDramas);
	const dispatch = useDispatch();
	console.log(trendingDramas);

	return (
		<Swiper
			autoplay={true}
			modules={[Autoplay]}
			className={classes.trendingDramas}
			spaceBetween={10}
			slidesPerView={5}
			//onSlideChange={() => console.log('slide change')}
			//onSwiper={(swiper) => console.log(swiper)}
		>
			{trendingDramas.results &&
				trendingDramas.results.map((dramaData) => {
					const {
						id,
						name,
						original_name: originalName,
						genre_ids: genreIds,
						poster_path: posterPath,
					} = dramaData;
					const genresString = genreIds
						.filter(
							(genre) => genres.hasOwnProperty(genre) && genre
						)
						.map((genre) => genres[genre])
						.join(', ');

					const slideClickHandler = () => {
						dispatch(fetchDramaDetail(id));
					};

					return (
						<SwiperSlide
							key={id}
							className={classes.trendingDramasItem}
							onClick={slideClickHandler}
						>
							<Link to={`/dramas/${id}`}>
								<div>
									<h3>{name}</h3>
									<h4>{originalName}</h4>
									<p>Genres: {genresString}</p>
								</div>
								<img
									src={
										posterPath === null
											? '/img/no-image.jpeg'
											: `https://image.tmdb.org/t/p/w500/${posterPath}`
									}
									alt='poster'
								/>
								<div className={classes.backdrop}></div>
							</Link>
						</SwiperSlide>
					);
				})}
		</Swiper>
	);
};

export default TrendingDramaCarousel;
