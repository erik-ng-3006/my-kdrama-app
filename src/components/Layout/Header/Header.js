import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toggleModal } from '../../../app/uiSlice';
import ButtonSecondary from '../../UI/ButtonSecondary/ButtonSecondary';
import classes from './Header.module.css';
import SearchBar from './SearchBar/SearchBar';
import { getAuth, signOut } from 'firebase/auth';
import { setUser } from '../../../app/userSlice';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const isLoggedIn = Object.keys(user).length !== 0;
	const location = useLocation();
	const navigate = useNavigate();

	const buttonClickHandler = () => {
		dispatch(toggleModal());
	};

	const logoutButtonHandler = () => {
		const auth = getAuth();

		signOut(auth)
			.then(() => {
				// Sign-out successful.
				dispatch(setUser({}));
				localStorage.removeItem('user');
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
		//redirect to home page if currently in favorite route
		location.pathname === '/favorite' && navigate('/');
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
				{!isLoggedIn && (
					<ButtonSecondary
						onClick={buttonClickHandler}
						className={classes.btn}
					>
						Login
					</ButtonSecondary>
				)}
				{isLoggedIn && (
					<>
						<img
							src='/img/default-user-avatar.jpeg'
							width='80px'
							alt='user profile'
						/>
						<ButtonSecondary
							className={classes.btn}
							onClick={logoutButtonHandler}
						>
							Logout
						</ButtonSecondary>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
