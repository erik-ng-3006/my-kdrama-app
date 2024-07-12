import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm, toggleModal } from '../../app/uiSlice';
import ButtonSecondary from '../UI/ButtonSecondary/ButtonSecondary';
import { app } from '../../firebase/firebase';
import classes from './LoginForm.module.css';
import {
	clearFormValues,
	setFormErrors,
	setFormValues,
} from '../../app/userSlice';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const LoginForm = () => {
	const formValues = useSelector((state) => state.user.formValues);
	const formErrors = useSelector((state) => state.user.formErrors);
	const auth = getAuth(app);
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const confirmPasswordInput = useRef(null);

	const dispatch = useDispatch();

	const cancelButtonHandler = () => {
		dispatch(toggleModal());
		if (Object.keys(formErrors).length > 0) {
			dispatch(setFormErrors({}));
		}
		dispatch(clearFormValues());
	};

	const isLoginForm = useSelector((state) => state.ui.isLoginForm);

	const switchFormHandler = () => {
		dispatch(toggleLoginForm());
	};

	const formInfo = isLoginForm ? (
		<p>
			Not a member? <span onClick={switchFormHandler}>Register</span>
		</p>
	) : (
		<p>
			Already a member? <span onClick={switchFormHandler}>Login</span>
		</p>
	);

	const onChangeHandler = (e) => {
		dispatch(setFormValues(e.target));
		if (Object.keys(formErrors).length > 0) {
			dispatch(setFormErrors({}));
		}
	};

	const validate = (values) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (values.email.trim() === '') {
			dispatch(
				setFormErrors({ error: 'email', message: 'Email is required' })
			);
			return false;
		}
		// check valid email
		if (!regex.test(values.email)) {
			dispatch(
				setFormErrors({
					error: 'email',
					message: 'Please enter a valid email!',
				})
			);
			return false;
		}
		if (values.password.trim() === '') {
			dispatch(
				setFormErrors({
					error: 'password',
					message: 'Password is required',
				})
			);
			return false;
		}
		if (!isLoginForm) {
			if (values.password.trim() <= 6) {
				dispatch(
					setFormErrors({
						error: 'password',
						message: 'Password must contain at least 6 characters',
					})
				);
				return false;
			}
			if (values.confirmPassword.trim() !== values.password) {
				dispatch(
					setFormErrors({
						error: 'confirmPassword',
						message:
							'Confirm password must match the password above!',
					})
				);
				return false;
			}
		}
		return true;
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		//form validation
		/* const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		const isEmailValid = regex.test(emailInput.current.value);
		const isPasswordValid = passwordInput.current.value >= 6;
		const isConfirmPasswordValid = !isLoginForm
			? confirmPasswordInput.current.value === passwordInput.current.value
			: true;
			*/
		const isFormValid = validate(formValues);

		if (isFormValid) {
			//handle log in
			if (isLoginForm) {
				signInWithEmailAndPassword(
					auth,
					emailInput.current.value,
					passwordInput.current.value
				)
					.then((userCredential) => {
						// Signed in
						//const user = userCredential.user;
						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						console.log(errorCode);
						const errorMessage = error.message;
						alert(errorMessage);
					});
			} else {
				//handle sign up
				const auth = getAuth(app);
				createUserWithEmailAndPassword(
					auth,
					emailInput.current.value,
					passwordInput.current.value
				)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						console.log(user);
						// ...
					})
					.catch((error) => {
						//const errorCode = error.code;
						const errorMessage = error.message;
						alert(errorMessage);
						// ..
					});
			}
			dispatch(toggleModal());
		}
	};

	return (
		<form className={classes['login-form']} onSubmit={formSubmitHandler}>
			<h2>{isLoginForm ? 'Login' : 'Sign Up'}</h2>
			<div
				className={`${classes['form-control']} ${
					formErrors.email && classes.invalid
				}`}
			>
				<label htmlFor='#email'>Email</label>
				<input
					onChange={onChangeHandler}
					value={formValues.email}
					ref={emailInput}
					type='text'
					id='email'
					name='email'
					placeholder='Please enter your email'
					autoComplete='email'
				/>
				<p>{formErrors.email}</p>
			</div>
			<div
				className={`${classes['form-control']} ${
					formErrors.password && classes.invalid
				}`}
			>
				<label htmlFor='#password'>Password</label>
				<input
					onChange={onChangeHandler}
					value={formValues.password}
					ref={passwordInput}
					type='password'
					id='password'
					name='password'
					placeholder='Please enter your password'
					autoComplete='current-password'
				/>
				<p>{formErrors.password}</p>
			</div>
			{!isLoginForm && (
				<div
					className={`${classes['form-control']} ${
						formErrors['confirmPassword'] && classes.invalid
					}`}
				>
					<label htmlFor='#confirmPassword'>Confirm password</label>
					<input
						onChange={onChangeHandler}
						ref={confirmPasswordInput}
						value={formValues.confirmPassword}
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						placeholder='Please re-enter your password'
						autoComplete='current-password'
					/>
					<p>{formErrors.confirmPassword}</p>
				</div>
			)}
			<div className={classes['form-action']}>
				<ButtonSecondary>Submit</ButtonSecondary>
			</div>
			{formInfo}
			<div onClick={cancelButtonHandler} className={classes.closeBtn}>
				&times;
			</div>
		</form>
	);
};

export default LoginForm;
