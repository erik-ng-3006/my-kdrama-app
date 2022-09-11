import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
			<Link to='/'>
				<img
					src='/img/logo-icon-80.png'
					alt='logo'
					className={classes.logo}
				/>
				<h1>My K-Dramas</h1>
			</Link>
			<div>
				<SearchBar />
				{
					<ButtonSecondary
						onClick={buttonClickHandler}
						className={classes.btn}
					>
						Login
					</ButtonSecondary>
				}
				{/* <img src='/img/default-user-avatar.jpeg' width='80px' />
				<ButtonSecondary className={classes.btn}>
					Logout
				</ButtonSecondary> */}
			</div>
		</header>
	);
};

export default Header;
