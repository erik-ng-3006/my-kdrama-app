import React from 'react';
import classes from './ActorSection.module.css';
const ActorSection = ({ detail }) => {
	const credits = detail.credits || {};
	const cast = credits.cast || [];
	return (
		<section className={classes.actorSection}>
			<h4>Casts</h4>
			<ul>
				{cast.map((person) => {
					const { id, name, profile_path: profilePath } = person;
					const source = profilePath
						? `https://image.tmdb.org/t/p/original/${profilePath}`
						: '/img/default-profile.png';
					return (
						<li key={id}>
							<img src={source} alt='actor' width='100px' />
							<h5>{name}</h5>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default ActorSection;
