import { configureStore } from '@reduxjs/toolkit';
import dramaReducer from './dramaSlice';
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import actorReducer from './actorSlice';
export const store = configureStore({
	reducer: {
		dramas: dramaReducer,
		ui: uiReducer,
		user: userReducer,
		actor: actorReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['user/setFormValues'],
			},
		}),
});
