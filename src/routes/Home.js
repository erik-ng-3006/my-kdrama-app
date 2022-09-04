import React from 'react';
import DiscoverDramaSection from '../components/DiscoverDramaSection/DiscoverDramaSection';
import LoginForm from '../components/LoginForm/LoginForm';
import NewDramaSection from '../components/NewDramaSection/NewDramaSection';
import TrendingDramaSection from '../components/TrendingDramaSection/TrendingDramaSection';
import Modal from '../components/Layout/Modal/Modal';
import { useSelector } from 'react-redux';

const Home = () => {
	const isShowModal = useSelector((state) => state.ui.isShowModal);
	return (
		<>
			<TrendingDramaSection />
			<NewDramaSection />
			<DiscoverDramaSection />
			{isShowModal && (
				<Modal>
					<LoginForm />
				</Modal>
			)}
		</>
	);
};

export default Home;
