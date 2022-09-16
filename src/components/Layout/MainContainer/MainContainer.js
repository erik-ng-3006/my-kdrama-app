import React from 'react';
import classes from './MainContainer.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { toggleMobilNavigation } from '../../../app/uiSlice';

const MainContainer = (props) => {
	const dispatch = useDispatch();
	const mobilNavigationButtonHandler = () => {
		dispatch(toggleMobilNavigation());
	};

	return (
		<main className={classes.main}>
			<MenuIcon
				sx={{ fontSize: '3rem' }}
				onClick={mobilNavigationButtonHandler}
			/>
			{props.children}
		</main>
	);
};

export default MainContainer;
