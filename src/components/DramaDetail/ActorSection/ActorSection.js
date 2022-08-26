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
					return (
						<li key={person.id}>
							<img
								src={`https://image.tmdb.org/t/p/original/${person['profile_path']}`}
								alt='actor'
								width='100px'
							/>
							<h5>{person.name}</h5>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default ActorSection;
