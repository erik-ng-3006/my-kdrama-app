import React from 'react';
import classes from './MainContainer.module.css';
import DramaList from './DramaList/DramaList';

const MainContainer = () => {
	return (
		<main className={classes.main}>
			<h2>Discover new dramas:</h2>
			<DramaList />
		</main>
	);
};

export default MainContainer;
