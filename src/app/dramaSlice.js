import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	BASE_URL,
	API_KEY,
	DISCOVER_API_URL,
	TRENDING_API_URL,
} from '../api/api';

const initialState = {
	dramas: {},
	newDramas: {},
	trendingDramas: {},
	searchedDramas: {},
	dramaDetail: {},
	status: 'idle',
	error: null,
};

export const fetchDramas = createAsyncThunk('dramas/fetchDramas', async () => {
	const randomPage = Math.floor(Math.random() * 6 + 1);
	return axios({
		method: 'get',
		url: DISCOVER_API_URL + `&page=${randomPage}`,
		responseType: 'json',
	})
		.then((response) => response.data)
		.catch((err) => err.message);
});
export const fetchNewDramas = createAsyncThunk(
	'dramas/fetchNewDramas',
	async () => {
		const date = new Date();
		return axios({
			method: 'get',
			url:
				DISCOVER_API_URL +
				'&sort_by=release_date.desc' +
				`&first_air_date_year=${date.getFullYear()}` +
				'&page=2',
			responseType: 'json',
		})
			.then((response) => response.data)
			.catch((err) => err.message);
	}
);

export const fetchTrendingDramas = createAsyncThunk(
	'dramas/fetchTrendingDramas',
	async () => {
		return axios({
			method: 'get',
			url: TRENDING_API_URL,
			responseType: 'json',
		})
			.then((response) => response.data)
			.catch((err) => err.message);
	}
);

export const fetchDramaDetail = createAsyncThunk(
	'dramas/fetchDramaDetail',
	async (dramaId) => {
		const DRAMA_DETAIL_URL = `${BASE_URL}/tv/${dramaId}?${API_KEY}&append_to_response=videos,credits`;
		return axios({
			method: 'get',
			url: DRAMA_DETAIL_URL,
			responseType: 'json',
		})
			.then((response) => response.data)
			.catch((err) => err.message);
	}
);

export const fetchSearchDramas = createAsyncThunk(
	'dramas/fetchSearchDramas',
	async (url) => {
		return axios({
			method: 'get',
			url,
			responseType: 'json',
		})
			.then((response) => response.data)
			.catch((err) => err.message);
	}
);

export const dramaSlice = createSlice({
	name: 'dramas',
	initialState,
	reducers: {
		setDramas(state, action) {
			state.dramas = action.payload;
		},
		setDramaDetail(state, action) {
			state.dramaDetail = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDramas.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.dramas = action.payload;
				//localStorage.setItem('dramas', JSON.stringify(action.payload));
			})
			.addCase(fetchDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchDramaDetail.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchDramaDetail.fulfilled, (state, action) => {
				state.status = 'success';
				state.dramaDetail = action.payload || {};
				/* localStorage.setItem(
					'drama-detail',
					JSON.stringify(action.payload)
				); */
			})
			.addCase(fetchDramaDetail.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchNewDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.newDramas = action.payload;
			})
			.addCase(fetchTrendingDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.trendingDramas = action.payload;
			})
			.addCase(fetchSearchDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.searchedDramas = action.payload;
			});
	},
});

export const { setDramas } = dramaSlice.actions;

export default dramaSlice.reducer;

export const genres = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western',
};
