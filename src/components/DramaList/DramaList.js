import React from 'react';
import { useSelector } from 'react-redux';
import DramaItem from './DramaItem/DramaItem';
import classes from './DramaList.module.css';
const DramaList = () => {
	const dramas = useSelector((state) => state.dramas.dramas);
	const results = dramas.results || [];

	return (
		<ul className={classes.dramaList}>
			{results.map((drama) => {
				return <DramaItem drama={drama} key={drama.id} />;
			})}
		</ul>
	);
};

export default DramaList;
