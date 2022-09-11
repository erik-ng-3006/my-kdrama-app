import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ExploreIcon from '@mui/icons-material/Explore';
import TvIcon from '@mui/icons-material/Tv';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import classes from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import { fetchFavoriteDramas } from '../../../app/dramaSlice';

const Sidebar = () => {
	const dispatch = useDispatch();
	const favoriteButtonClickHandler = () => {
		dispatch(fetchFavoriteDramas());
	};
	return (
		<nav className={classes.sidebar}>
			<ul>
				<li>
					<a href='/'>
						<HomeIcon className={classes.icon} />
						<span>Home</span>
					</a>
				</li>
				<li>
					<a href='#trending-section'>
						<LocalFireDepartmentIcon className={classes.icon} />
						<span>Trending</span>
					</a>
				</li>
				<li>
					<a href='#new-drama-section'>
						<TvIcon className={classes.icon} />
						<span>Kdramas</span>
					</a>
				</li>
				<li>
					<a href='#discover-section'>
						<ExploreIcon className={classes.icon} />
						<span>Explore</span>
					</a>
				</li>
				<li onClick={favoriteButtonClickHandler}>
					<a href='/favorite'>
						<FavoriteBorderIcon className={classes.icon} />
						<span>Favorite</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Sidebar;
