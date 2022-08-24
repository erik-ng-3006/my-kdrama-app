import React from 'react';
import { useSelector } from 'react-redux';
import ActorSection from './ActorSection/ActorSection';
import classes from './DramaDetail.module.css';
import DramaSection from './DramaSection/DramaSection';
//import TrailerSection from './TrailerSection/TrailerSection';

const DramaDetail = () => {
	//back drop logic???
	const detail = useSelector((state) => state.dramas.dramaDetail);
	const backdropPath = detail['backdrop_path'] || '';
	const backdrop =
		backdropPath !== ''
			? `https://image.tmdb.org/t/p/original/${backdropPath}`
			: 'https://source.unsplash.com/random';

	return (
		<section className={classes.dramaDetail}>
			<div
				style={{
					backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.4),rgb(0,0,0)), url(${backdrop})`,
				}}
			></div>
			<DramaSection />
			<ActorSection />
			{/* <TrailerSection /> */}
		</section>
	);
};

export default DramaDetail;
