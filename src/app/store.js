import { configureStore } from '@reduxjs/toolkit';
import dramaReducer from './dramaSlice';
import uiReducer from './uiSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		dramas: dramaReducer,
		ui: uiReducer,
		user: userReducer,
	},
});
