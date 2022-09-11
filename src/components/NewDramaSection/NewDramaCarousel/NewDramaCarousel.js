import React from 'react';
import classes from './NewDramaCarousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDramaDetail, genresList } from '../../../app/dramaSlice';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const NewDramaCarousel = () => {
	const newDramas = useSelector((state) => state.dramas.newDramas);
	const { width } = useWindowDimensions();
	const isSmallScreen = width < 500;
	const isMediumScreen = width < 768;
	const isLargeScreenDevice = width < 1050;

	const dispatch = useDispatch();
	return (
		<Swiper
			autoplay={true}
			modules={[Autoplay]}
			className={classes.newDramaCarousel}
			spaceBetween={10}
			slidesPerView={
				!isLargeScreenDevice
					? 5
					: !isMediumScreen
					? 4
					: !isSmallScreen
					? 3
					: 2
			}
			//onSlideChange={() => console.log('slide change')}
			//onSwiper={(swiper) => console.log(swiper)}
		>
			{newDramas.results &&
				newDramas.results.map((dramaData) => {
					const {
						id,
						name,
						original_name: originalName,
						genre_ids: genreIds,
						poster_path: posterPath,
					} = dramaData;
					const genresString = genreIds
						.filter(
							(genre) => genresList.hasOwnProperty(genre) && genre
						)
						.map((genre) => genresList[genre])
						.join(', ');

					const slideClickHandler = () => {
						dispatch(fetchDramaDetail(id));
					};

					return (
						<SwiperSlide
							key={id}
							className={classes.newDramaItem}
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
										!posterPath
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

export default NewDramaCarousel;
