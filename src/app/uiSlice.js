import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isShowModal: false,
	isLoginForm: true,
	isEditFavoriteDramas: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleModal(state) {
			state.isShowModal = !state.isShowModal;
		},
		toggleLoginForm(state) {
			state.isLoginForm = !state.isLoginForm;
		},
		toggleEditMode(state) {
			state.isEditFavoriteDramas = !state.isEditFavoriteDramas;
		},
	},
});

export const { toggleModal, toggleLoginForm, toggleEditMode } = uiSlice.actions;

export default uiSlice.reducer;
