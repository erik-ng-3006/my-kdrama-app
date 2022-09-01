import React from 'react';
import classes from './NewDramaCarousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDramaDetail, genres } from '../../../app/dramaSlice';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
const NewDramaCarousel = () => {
	const newDramas = useSelector((state) => state.dramas.newDramas);
	console.log(newDramas);

	const dispatch = useDispatch();
	return (
		<Swiper
			autoplay={true}
			modules={[Autoplay]}
			className={classes.newDramaCarousel}
			spaceBetween={10}
			slidesPerView={5}
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

export default NewDramaCarousel;
