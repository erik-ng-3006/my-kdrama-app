import React from 'react';
import { useSelector } from 'react-redux';
import DramaItem from './DramaItem/DramaItem';
import classes from './DramaList.module.css';
const DramaList = () => {
	const dramas = useSelector((state) => state.dramas.dramas);
	const results = dramas.results || [];

	return (
		<section className={classes.dramaList} id='discover-section'>
			<h2>Discover dramas:</h2>
			<ul>
				{results.map((drama) => {
					return <DramaItem drama={drama} key={drama.id} />;
				})}
			</ul>
		</section>
	);
};

export default DramaList;
