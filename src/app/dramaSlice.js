import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	doc,
	deleteField,
	setDoc,
	updateDoc,
	getDoc,
} from 'firebase/firestore';

import axios from 'axios';
import {
	BASE_URL,
	API_KEY,
	DISCOVER_API_URL,
	TRENDING_API_URL,
} from '../api/api';

import { db } from '../firebase/firebase';

const initialState = {
	dramas: {},
	newDramas: {},
	trendingDramas: {},
	searchedDramas: {},
	dramaDetail: {},
	favoriteDramas: [],
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

export const fetchFavoriteDramas = createAsyncThunk(
	'dramas/fetchFavoriteDramas',
	async (uid) => {
		const docRef = doc(db, 'user', uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return Object.keys(docSnap.data()).map(
				(key) => docSnap.data()[key]
			);
		} else {
			// doc.data() will be undefined in this case
			//console.log('No such document!');
			return [];
		}
	}
);

export const deleteFavoriteDrama = createAsyncThunk(
	'dramas/deleteFavoriteDrama',
	async ([uid, id]) => {
		await updateDoc(doc(db, 'user', uid), {
			[id]: deleteField(),
		});
		return id;
	}
);

export const addFavoriteDrama = createAsyncThunk(
	'dramas/addFavoriteDrama',
	async ([drama, uid]) => {
		try {
			await setDoc(doc(db, 'user', uid), drama);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		return drama;
	}
);

export const updateFavoriteDrama = createAsyncThunk(
	'dramas/updateFavoriteDrama',
	async ([drama, uid]) => {
		await updateDoc(doc(db, 'user', uid), drama);
		return drama;
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
			.addCase(fetchNewDramas.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchNewDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchTrendingDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.trendingDramas = action.payload;
			})
			.addCase(fetchTrendingDramas.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchTrendingDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchSearchDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.searchedDramas = action.payload;
			})
			.addCase(fetchSearchDramas.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchSearchDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchFavoriteDramas.fulfilled, (state, action) => {
				state.status = 'success';
				state.favoriteDramas = action.payload;
			})
			.addCase(fetchFavoriteDramas.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchFavoriteDramas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(deleteFavoriteDrama.fulfilled, (state, action) => {
				state.status = 'success';
				state.favoriteDramas = state.favoriteDramas.filter(
					(drama) => drama.id !== action.payload
				);
			})
			.addCase(addFavoriteDrama.fulfilled, (state, action) => {
				state.status = 'success';
				state.favoriteDramas.push(action.payload);
			})
			.addCase(updateFavoriteDrama.fulfilled, (state, action) => {
				state.status = 'success';
				state.favoriteDramas.push(action.payload);
			});
	},
});

export const { setDramas, setDramaDetail } = dramaSlice.actions;

export default dramaSlice.reducer;

export const genresList = {
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
