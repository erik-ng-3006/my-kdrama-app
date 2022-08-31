import React from 'react';
import MainContainer from '../MainContainer/MainContainer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const Layout = (props) => {
	return (
		<>
			<Header />
			<Sidebar />
			<MainContainer>{props.children}</MainContainer>
		</>
	);
};

export default Layout;
