import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobilNavigation, toggleModal } from '../../../app/uiSlice';
import ButtonSecondary from '../../UI/ButtonSecondary/ButtonSecondary';
import classes from './MobilNavigation.module.css';

const MobilNavigation = () => {
	const dispatch = useDispatch();
	const closeMobilNavigationButtonHandler = () => {
		dispatch(toggleMobilNavigation());
	};
	const openFormButtonHandler = () => {
		dispatch(toggleModal());
		dispatch(toggleMobilNavigation());
	};
	return (
		<nav className={classes['mobil-navigation']}>
			<div onClick={closeMobilNavigationButtonHandler}>&times;</div>
			<ul>
				<li>
					<ButtonSecondary onClick={openFormButtonHandler}>
						Login
					</ButtonSecondary>
				</li>
				<li onClick={closeMobilNavigationButtonHandler}>
					<Link to='/'>Home</Link>
				</li>
				<li onClick={closeMobilNavigationButtonHandler}>
					<a href='#trending-section'>Trending</a>
				</li>
				<li onClick={closeMobilNavigationButtonHandler}>
					<a href='#discover-section'>Explore</a>
				</li>
				<li onClick={closeMobilNavigationButtonHandler}>
					<Link to='/favorite'>Favorite</Link>
				</li>
			</ul>
		</nav>
	);
};

export default MobilNavigation;
