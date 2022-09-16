import React from 'react';
import MainContainer from './MainContainer/MainContainer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import Modal from './Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import MobilNavigation from './MobilNavigation/MobilNavigation';

const Layout = (props) => {
	const isShowModal = useSelector((state) => state.ui.isShowModal);
	const isShowMobilNavigation = useSelector(
		(state) => state.ui.isShowMobilNavigation
	);
	return (
		<>
			<Header />
			<Sidebar />
			{isShowMobilNavigation && <MobilNavigation />}
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
