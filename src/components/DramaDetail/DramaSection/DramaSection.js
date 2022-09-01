import React from 'react';
import classes from './DramaSection.module.css';
import Rating from '@mui/material/Rating';

const DramaSection = ({ detail }) => {
	const {
		name,
		original_name: originalName,
		overview,
		poster_path: posterPath,
		vote_average: rating,
	} = detail;
	const genres = detail.genres || [];

	const convertedRating = (rating / 2).toFixed(1);
	return (
		<section className={classes.dramaSection}>
			<img
				src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
				alt='drama poster'
			></img>
			<div>
				<h3>{name}</h3>
				<h4>{originalName}</h4>
				<Rating
					className='mg-bt-sm'
					readOnly
					name='drama-rating'
					value={convertedRating}
					precision={0.1}
					sx={{
						fontSize: '3rem',
						boxShadow:
							'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
					}}
				/>
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
