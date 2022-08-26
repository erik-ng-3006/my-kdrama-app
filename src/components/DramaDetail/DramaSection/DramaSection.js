import React from 'react';
import classes from './DramaSection.module.css';

const DramaSection = ({ detail }) => {
	const { name, overview, poster_path } = detail;
	const genres = detail.genres || [];
	return (
		<section className={classes.dramaSection}>
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				alt='drama poster'
			></img>
			<div>
				<h3>{name}</h3>
				{/* <div>rating: ***</div> */}
				{/* 	<ul>
					<li>Action </li>
					<li>Horror</li>
				</ul> */}
				<ul>
					{genres.map((genre) => {
						return <li key={genre.id}>{genre.name}</li>;
					})}
				</ul>

				<div>
					<p>{overview}</p>
				</div>
			</div>
		</section>
	);
};

export default DramaSection;
