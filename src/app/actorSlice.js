import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../api/api';

const initialState = {
	actorDetail: {},
	socialDetail: {},
	status: 'idle',
	error: null,
};

export const fetchSocialDetail = createAsyncThunk(
	'actor/fetchSocialDetail',
	async (id) => {
		return axios
			.get(
				`${BASE_URL}/person/${id}/external_ids?${API_KEY}&language=en-US`
			)
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				console.log(e);
			});
	}
);

export const fetchActorDetail = createAsyncThunk(
	'actor/fetchActorDetail',
	async (id) => {
		return axios
			.get(`${BASE_URL}/person/${id}?${API_KEY}&language=en-US`)
			.then((res) => {
				return res.data;
			})
			.catch((e) => {
				console.log(e);
			});
	}
);

const actorSlice = createSlice({
	initialState,
	name: 'actor',
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchActorDetail.fulfilled, (state, action) => {
			state.status = 'success';
			state.actorDetail = action.payload;
		});
		builder.addCase(fetchActorDetail.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(fetchActorDetail.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.error;
		});
		builder.addCase(fetchSocialDetail.fulfilled, (state, action) => {
			state.status = 'success';
			state.socialDetail = action.payload;
		});
		builder.addCase(fetchSocialDetail.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.error;
		});
	},
});

export default actorSlice.reducer;
