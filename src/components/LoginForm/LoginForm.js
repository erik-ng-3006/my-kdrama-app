import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm, toggleModal } from '../../app/uiSlice';
import ButtonSecondary from '../UI/ButtonSecondary/ButtonSecondary';
import { app } from '../../firebase/firebase';
import classes from './LoginForm.module.css';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
const LoginForm = () => {
	const emailInput = useRef(null);
	const passwordInput = useRef(null);

	const dispatch = useDispatch();

	const cancelButtonHandler = () => {
		dispatch(toggleModal());
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

	const formSubmitHandler = (e) => {
		e.preventDefault();
		//handle log in
		if (isLoginForm) {
			const auth = getAuth(app);
			signInWithEmailAndPassword(
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
	};

	return (
		<form className={classes['login-form']} onSubmit={formSubmitHandler}>
			<h2>{isLoginForm ? 'Login' : 'Sign Up'}</h2>
			<div className={classes['form-control']}>
				<label htmlFor='#email'>Email</label>
				<input
					ref={emailInput}
					type='text'
					id='email'
					name='email'
					placeholder='Please enter your email'
					autoComplete='email'
				/>
			</div>
			<div className={classes['form-control']}>
				<label htmlFor='#password'>Password</label>
				<input
					ref={passwordInput}
					type='password'
					id='password'
					name='password'
					placeholder='Please enter your password'
					autoComplete='current-password'
				/>
			</div>
			{!isLoginForm && (
				<div className={classes['form-control']}>
					<label htmlFor='#confirm-password'>Confirm password</label>
					<input
						type='password'
						id='confirm-password'
						name='confirm-password'
						placeholder='Please re-enter your password'
						autoComplete='current-password'
					/>
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
