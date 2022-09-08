import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import classes from './SearchBar.module.css';
import SearchList from './SearchList/SearchList';
import { useDispatch } from 'react-redux';
import { fetchSearchDramas } from '../../../../app/dramaSlice';
import { API_KEY, BASE_URL } from '../../../../api/api';
import { useSelector } from 'react-redux';

const SearchBar = () => {
	const [inputValue, setInputValue] = useState('');
	const [isShowSearchList, setIsShowSearchList] = useState(false);

	const dispatch = useDispatch();
	const searchedDramas = useSelector((state) => state.dramas.searchedDramas);

	const { results } = searchedDramas;
	const inputChangeHandler = (e) => {
		setIsShowSearchList(true);
		setInputValue(e.target.value);
		const query = e.target.value
			? `&query=${e.target.value.replace(' ', '%20')}`
			: '';
		const searchUrl = `${BASE_URL}/search/tv?${API_KEY}&language=en-US&page=1${query}&include_adult=false`;
		dispatch(fetchSearchDramas(searchUrl));
	};

	const inputBlurHandler = () => {
		setInputValue('');
		setIsShowSearchList(false);
	};

	return (
		<div className={classes.searchBar}>
			<input
				type='text'
				value={inputValue}
				placeholder='Search K-drama'
				onChange={inputChangeHandler}
				onBlur={inputBlurHandler}
			></input>
			<SearchIcon className={classes.icon} />
			{inputValue !== '' && results && results.length === 0 && (
				<div
					style={{
						color: 'black',
						backgroundColor: 'white',
						zIndex: '10000',
						padding: '3rem 0 2rem 0',
						marginTop: '-1.5rem',
					}}
				>
					No drama found!!!!
				</div>
			)}
			{isShowSearchList && results && results.length > 0 && (
				<SearchList dramas={results} />
			)}
		</div>
	);
};

export default SearchBar;
