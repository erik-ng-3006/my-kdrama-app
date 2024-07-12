import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isShowModal: false,
	isLoginForm: true,
	isEditFavoriteDramas: false,
	isShowMobilNavigation: false,
	isShowActorModal: false,
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
		toggleMobilNavigation(state) {
			state.isShowMobilNavigation = !state.isShowMobilNavigation;
		},
		toggleShowActorModal(state) {
			state.isShowActorModal = !state.isShowActorModal;
		},
	},
});

export const {
	toggleModal,
	toggleLoginForm,
	toggleEditMode,
	toggleMobilNavigation,
	toggleShowActorModal,
} = uiSlice.actions;

export default uiSlice.reducer;
