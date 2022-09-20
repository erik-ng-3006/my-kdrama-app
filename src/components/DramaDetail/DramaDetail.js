import React from 'react';
import { useSelector } from 'react-redux';
import ActorSection from './ActorSection/ActorSection';
import classes from './DramaDetail.module.css';
import DramaSection from './DramaSection/DramaSection';
import TrailerSection from './TrailerSection/TrailerSection';

const DramaDetail = () => {
	const detail = useSelector((state) => state.dramas.dramaDetail);

	const backdropPath = detail['backdrop_path'] || '';
	const backdrop =
		backdropPath !== ''
			? `https://image.tmdb.org/t/p/original/${backdropPath}`
			: 'https://source.unsplash.com/random';

	return (
		<section className={classes.dramaDetail}>
			<div
				className={classes.backdrop}
				style={{
					backgroundImage: `linear-gradient(to bottom, #00000066, #000 75%), url(${backdrop})`,
				}}
			></div>
			<DramaSection detail={detail} />
			<ActorSection detail={detail} />
			<TrailerSection detail={detail} />
		</section>
	);
};

export default DramaDetail;
