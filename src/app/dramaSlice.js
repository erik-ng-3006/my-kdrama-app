import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY, DISCOVER_API_URL } from '../api/api';

const initialState = {
	dramas: {},
	dramaDetail: {},
	status: 'idle',
	error: null,
};

export const fetchDramas = createAsyncThunk('dramas/fetchDramas', async () => {
	return axios({
		method: 'get',
		url: DISCOVER_API_URL,
		responseType: 'json',
	})
		.then((response) => response.data)
		.catch((err) => err.message);
});

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
				state.dramas = action.payload || {};
				localStorage.setItem('dramas', JSON.stringify(action.payload));
			})
			.addCase(fetchDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchDramaDetail.fulfilled, (state, action) => {
				state.status = 'success';
				state.dramaDetail = action.payload || {};
				localStorage.setItem(
					'drama-detail',
					JSON.stringify(action.payload)
				);
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
