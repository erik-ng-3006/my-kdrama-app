import React, { useState, useEffect, useRef } from 'react';
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
	const inputRef = useRef(null); // Add ref for the input

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

	const inputFocusHandler = () => {
		setInputValue('');
		setIsShowSearchList(false);
	};

	// Add useEffect to handle clicks outside the input
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setIsShowSearchList(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.searchBar}>
			<input
				type='text'
				value={inputValue}
				placeholder='Search K-drama'
				onChange={inputChangeHandler}
				onFocus={inputFocusHandler}
				ref={inputRef} // Attach ref to the input
			></input>
			<SearchIcon className={classes.icon} />
			{inputValue !== '' && results && results.length === 0 && (
				<div
					style={{
						color: 'black',
						backgroundColor: '#fff',
						zIndex: '10000',
						padding: '3rem 1rem 2rem 1rem',
						marginTop: '-1.5rem',
						borderRadius: '0 0 1.2rem 1.2rem',
					}}
				>
					No drama found!!!!
				</div>
			)}
			{isShowSearchList && results && results.length > 0 && (
				<SearchList
					dramas={results}
					isShowSearchList={isShowSearchList}
				/>
			)}
		</div>
	);
};

export default SearchBar;
