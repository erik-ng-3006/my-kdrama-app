import React from 'react';
import classes from './ButtonSecondary.module.css';

const ButtonSecondary = (props) => {
	const styles = classes.buttonSecondary + ' ' + props.className;
	return (
		<button className={styles} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

export default ButtonSecondary;
