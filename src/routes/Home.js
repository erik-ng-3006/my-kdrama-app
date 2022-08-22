import React from 'react';
import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import Sidebar from '../components/Sidebar/Sidebar';

const Home = () => {
	return (
		<>
			<Header />
			<Sidebar />
			<MainContainer />
		</>
	);
};

export default Home;
