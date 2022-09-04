import { configureStore } from '@reduxjs/toolkit';
import dramaReducer from './dramaSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
	reducer: {
		dramas: dramaReducer,
		ui: uiReducer,
	},
});
