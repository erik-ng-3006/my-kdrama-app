import React, { useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import classes from './SearchBar.module.css';
import SearchList from './SearchList/SearchList';
import { useDispatch } from 'react-redux';
import { fetchSearchDramas } from '../../../../app/dramaSlice';
import { API_KEY, BASE_URL } from '../../../../api/api';
import { useSelector } from 'react-redux';

const SearchBar = () => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const searchedDramas = useSelector((state) => state.dramas.searchedDramas);
	const { results } = searchedDramas;

	const inputChangeHandler = (e) => {
		const query = e.target.value
			? `&query=${e.target.value.replace(' ', '%20')}`
			: '';
		const searchUrl = `${BASE_URL}/search/tv?${API_KEY}&language=en-US&page=1${query}&include_adult=false`;
		dispatch(fetchSearchDramas(searchUrl));
	};
	return (
		<div className={classes.searchBar}>
			<input
				type='text'
				ref={inputRef}
				placeholder='Search K-drama'
				onChange={inputChangeHandler}
			></input>
			<SearchIcon className={classes.icon} />
			{/* {!inputRef.current.value && !results ? (
				<div>No drama found!!!!!</div>
			) : (
				<SearchList dramas={results} />
			)} */}
		</div>
	);
};

export default SearchBar;
