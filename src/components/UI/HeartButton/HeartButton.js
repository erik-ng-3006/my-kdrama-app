import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import classes from './HeartButton.module.css';

const HeartButton = ({ isChecked, onClick, ...rest }) => {
	const [opacityCheckedIcon, setOpacityCheckedIcon] = useState('0');
	const [opacityUncheckedIcon, setOpacityUncheckedIcon] = useState('1');

	useEffect(() => {
		if (isChecked) {
			setOpacityCheckedIcon('1');
			setOpacityUncheckedIcon('0');
		}
	}, [isChecked]);

	const buttonClickHandler = () => {
		setOpacityCheckedIcon(opacityCheckedIcon === '1' ? '0' : '1');
		setOpacityUncheckedIcon(opacityUncheckedIcon === '1' ? '0' : '1');
		onClick();
	};

	return (
		<button
			onClick={buttonClickHandler}
			className={classes.heartButton}
			{...rest}
		>
			<FavoriteIcon
				color='red'
				sx={{
					fontSize: '3rem',
					color: '#cb3837',
					position: 'absolute',
					transition: 'all 300ms ease-out ',
					opacity: opacityCheckedIcon,
				}}
			/>
			<FavoriteBorderIcon
				sx={{
					fontSize: '3rem',
					color: 'white',
					position: 'absolute',
					opacity: opacityUncheckedIcon,
				}}
			/>
		</button>
	);
};

export default HeartButton;
