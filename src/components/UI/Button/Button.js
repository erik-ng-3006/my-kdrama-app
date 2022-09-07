import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, className, onClick, ...rest }) => {
	const styles = classes.btn + ' ' + className;
	return (
		<button type='button' className={styles} onClick={onClick} {...rest}>
			{children}
		</button>
	);
};

export default Button;
