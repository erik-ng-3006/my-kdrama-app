import React, { useEffect, useMemo } from 'react';
import FavoriteList from '../components/FavoriteList/FavoriteList';
import Button from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import { toggleEditMode } from '../app/uiSlice';
import { useNavigate } from 'react-router-dom';
const Favorite = () => {
	const favoriteDramas = useSelector((state) => state.dramas.favoriteDramas);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//Check if the user is logged in
	const loggedUser = useMemo(
		() => JSON.parse(localStorage.getItem('user')) || {},
		[]
	);

	useEffect(() => {
		if (Object.keys(loggedUser).length === 0) {
			navigate('/');
		}
	}, [loggedUser, navigate]);

	const editButtonHandler = () => {
		dispatch(toggleEditMode());
	};

	let content;
	if (favoriteDramas.length > 0) {
		content = <FavoriteList />;
	} else {
		content = (
			<div style={{ textAlign: 'center' }}>
				<p className='mg-bt-md'>
					There is no drama on your list yet!!!
				</p>
			</div>
		);
	}
	return (
		<section style={{ position: 'relative' }}>
			<SettingsIcon
				onClick={editButtonHandler}
				sx={{
					position: 'absolute',
					top: '1rem',
					right: '1rem',
					fontSize: '3rem',
					transition: 'all 300ms ease-out',
					':hover': {
						cursor: 'pointer',
						rotate: '45deg',
					},
				}}
			/>
			<h2>Wishlist</h2>
			{content}
			<div className='center'>
				<Button>
					<Link
						to='/'
						style={{ color: 'white', textDecoration: 'none' }}
					>
						Add drama
					</Link>
				</Button>
			</div>
		</section>
	);
};

export default Favorite;
