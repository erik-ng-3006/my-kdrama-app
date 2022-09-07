import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import classes from './HeartButton.module.css';

const HeartButton = ({ isChecked = false, onClick, ...rest }) => {
	const [checkedHeartStyle, setCheckedHeartStyle] = useState({
		fontSize: '3rem',
		color: '#cb3837',
		position: 'absolute',
		transition: 'all 300ms ease-out ',
		opacity: `${isChecked ? '1' : '0'}`,
	});
	const [uncheckedHeartStyle, setUncheckedHeartStyle] = useState({
		fontSize: '3rem',
		color: 'white',
		position: 'absolute',
		opacity: `${!isChecked ? '1' : '0'}`,
	});

	/* let checkedHeartStyle = {
		fontSize: '2.5rem',
		color: '#cb3837',
		position: 'absolute',
		opacity: '1',
	}; */

	/* let uncheckedHeartStyle = {
		fontSize: '2.5rem',
		color: 'white',
		position: 'absolute',
		opacity: '1',
	}; */

	const buttonClickHandler = () => {
		setCheckedHeartStyle({
			...checkedHeartStyle,
			opacity: `${checkedHeartStyle.opacity === '0' ? '1' : '0'}`,
		});

		setUncheckedHeartStyle({
			...uncheckedHeartStyle,
			opacity: `${uncheckedHeartStyle.opacity === '0' ? '1' : '0'}`,
		});
		onClick();
	};

	return (
		<button
			onClick={buttonClickHandler}
			className={classes.heartButton}
			{...rest}
		>
			<FavoriteIcon color='red' sx={checkedHeartStyle} />
			<FavoriteBorderIcon sx={uncheckedHeartStyle} />
		</button>
	);
};

export default HeartButton;
