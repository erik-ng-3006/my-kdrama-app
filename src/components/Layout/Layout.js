import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import Modal from './Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

const Layout = (props) => {
	const isShowModal = useSelector((state) => state.ui.isShowModal);

	return (
		<>
			<Header />
			<Sidebar />
			<MainContainer>{props.children}</MainContainer>
			{isShowModal && (
				<Modal>
					<LoginForm />
				</Modal>
			)}
		</>
	);
};

export default Layout;
