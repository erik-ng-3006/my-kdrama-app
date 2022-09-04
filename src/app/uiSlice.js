import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isShowModal: false,
	isLoginForm: true,
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
	},
});

export const { toggleModal, toggleLoginForm } = uiSlice.actions;

export default uiSlice.reducer;
