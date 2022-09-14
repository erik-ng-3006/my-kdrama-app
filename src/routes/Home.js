import React from 'react';
import DiscoverDramaSection from '../components/DiscoverDramaSection/DiscoverDramaSection';
import NewDramaSection from '../components/NewDramaSection/NewDramaSection';
import TrendingDramaSection from '../components/TrendingDramaSection/TrendingDramaSection';

const Home = () => {
	return (
		<>
			<TrendingDramaSection />
			<NewDramaSection />
			<DiscoverDramaSection />
		</>
	);
};

export default Home;
