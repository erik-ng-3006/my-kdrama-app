import React from 'react';
import classes from './TrailerSection.module.css';

const TrailerSection = () => {
	/* const onLoadHandler = function (event) {
		event.target.style.height =
			event.target.contentWindow.document.body.scrollHeight + 'px';
	}; */
	return (
		<section className={classes.trailerSection}>
			<h4>Official Trailer Videos:</h4>
			<ul>
				<li>
					<iframe
						title='st'
						src='https://www.youtube.com/embed/tgbNymZ7vqY'
						//onLoad={onLoadHandler}
					></iframe>
					<iframe
						title='st'
						src='https://www.youtube.com/embed/tgbNymZ7vqY'
						//onLoad={onLoadHandler}
					></iframe>
				</li>
			</ul>
		</section>
	);
};

export default TrailerSection;
