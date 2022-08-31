import React from 'react';
import classes from './TrailerSection.module.css';

const TrailerSection = ({ detail }) => {
	const videos = detail.videos || {};
	const videoResults = videos.results || [];

	/* const onLoadHandler = function (event) {
		event.target.style.height =
			event.target.contentWindow.document.body.scrollHeight + 'px';
	}; */

	return (
		<section className={classes.trailerSection}>
			<h4>Official Trailer Videos:</h4>
			<ul>
				{videoResults.map((video) => {
					return (
						<li key={video.id}>
							<iframe
								title='drama trailer'
								src={`https://www.youtube.com/embed/${video.key}`}
							/>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default TrailerSection;
