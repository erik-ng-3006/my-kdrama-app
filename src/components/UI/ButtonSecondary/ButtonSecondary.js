import React from 'react';
import classes from './ButtonSecondary.module.css';

const ButtonSecondary = ({ children, className, onClick, ...rest }) => {
	const styles = classes.buttonSecondary + ' ' + className;
	return (
		<button className={styles} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default ButtonSecondary;
