import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../app/uiSlice';
import classes from './Modal.module.css';

const Modal = (props) => {
	const dispatch = useDispatch();
	const backdropClickHandler = () => {
		dispatch(toggleModal());
	};
	return (
		<div className={classes.modal}>
			{props.children}
			<div
				className={classes.backdrop}
				onClick={backdropClickHandler}
			></div>
		</div>
	);
};

export default Modal;
