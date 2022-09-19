import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	formValues: {
		email: '',
		password: '',
		confirmPassword: '',
	},
	formErrors: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		setFormValues(state, { payload }) {
			const { name, value } = payload;
			state.formValues = { ...state.formValues, [name]: value };
		},
		clearFormValues(state) {
			state.formValues = initialState.formValues;
		},
		setFormErrors(state, { payload }) {
			const { error, message } = payload;
			state.formErrors = { ...payload.formErrors, [error]: message };
		},
	},
});

export const { setUser, setFormValues, setFormErrors, clearFormValues } =
	userSlice.actions;

export default userSlice.reducer;
