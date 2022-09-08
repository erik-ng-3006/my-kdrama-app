import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../app/uiSlice';
import ButtonSecondary from '../../UI/ButtonSecondary/ButtonSecondary';
import classes from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';

const Header = () => {
	const dispatch = useDispatch();
	const buttonClickHandler = () => {
		dispatch(toggleModal());
	};
	return (
		<header className={classes.header}>
			<div>
				<img src='/img/logo-icon-80.png' alt='logo' />
				<h1>My K-Dramas</h1>
			</div>
			<div>
				<SearchBar />
				<ButtonSecondary
					onClick={buttonClickHandler}
					className={classes.btn}
				>
					Login
				</ButtonSecondary>
			</div>
		</header>
	);
};

export default Header;
