import { useEffect } from 'react';
import './App.css';
import {
	fetchDramas,
	fetchNewDramas,
	fetchTrendingDramas,
} from './app/dramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/routes/Home';
import Layout from './components/Layout/Layout';
import Drama from './routes/Drama';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
	const dramasStatus = useSelector((state) => state.dramas.status);
	const dispatch = useDispatch();

	useEffect(() => {
		//const dramasData = JSON.parse(localStorage.getItem('dramas'));

		/* if (dramasData) {
			dispatch(setDramas(dramasData));
		} else { */
		if (dramasStatus === 'idle') {
			dispatch(fetchDramas());
			dispatch(fetchTrendingDramas());
			dispatch(fetchNewDramas());
		}
		//}
	}, [dramasStatus, dispatch]);

	return (
		<div className='App'>
			<Layout>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='dramas/:dramaId' element={<Drama />}></Route>
					<Route
						path='*'
						element={
							<main style={{ padding: '1rem' }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</Layout>
		</div>
	);
}

export default App;
