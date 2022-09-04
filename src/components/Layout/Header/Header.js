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
			<h1>My K/Dramas</h1>
			<div>
				<SearchBar />
				<ButtonSecondary onClick={buttonClickHandler}>
					Login
				</ButtonSecondary>
			</div>
		</header>
	);
};

export default Header;
