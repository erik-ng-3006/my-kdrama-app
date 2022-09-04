import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm, toggleModal } from '../../app/uiSlice';
import ButtonSecondary from '../UI/ButtonSecondary/ButtonSecondary';
import classes from './LoginForm.module.css';

const LoginForm = () => {
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

	return (
		<form className={classes['login-form']}>
			<h2>{isLoginForm ? 'Login' : 'Sign Up'}</h2>
			<div className={classes['form-control']}>
				<label for='#email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					placeholder='Please enter your email'
				/>
			</div>
			<div className={classes['form-control']}>
				<label for='#password'>Password</label>
				<input
					type='password'
					id='password'
					name='password'
					placeholder='Please enter your password'
				/>
			</div>
			{!isLoginForm && (
				<div className={classes['form-control']}>
					<label for='#confirm-password'>Confirm password</label>
					<input
						type='password'
						id='confirm-password'
						name='confirm-password'
						placeholder='Please re-enter your password'
					/>
				</div>
			)}
			<div className={classes['form-action']}>
				<ButtonSecondary type='submit'>Submit</ButtonSecondary>
			</div>
			{formInfo}
			<div onClick={cancelButtonHandler} className={classes.closeBtn}>
				&times;
			</div>
		</form>
	);
};

export default LoginForm;
