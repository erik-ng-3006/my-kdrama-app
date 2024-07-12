import { useEffect, useMemo } from 'react';
import {
	fetchDramas,
	fetchFavoriteDramas,
	fetchNewDramas,
	fetchTrendingDramas,
} from './app/dramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/routes/Home';
import Layout from './components/Layout/Layout';
import Drama from './routes/Drama';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Favorite from './routes/Favorite';
import { setUser } from './app/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
	const dramasStatus = useSelector((state) => state.dramas.status);
	const dispatch = useDispatch();
	const auth = getAuth();
	const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

	useEffect(() => {
		if (dramasStatus === 'idle') {
			dispatch(fetchDramas());
			dispatch(fetchTrendingDramas());
			dispatch(fetchNewDramas());
			user && dispatch(fetchFavoriteDramas(user.uid));
		}

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const convertedUser = JSON.parse(JSON.stringify(user));
				dispatch(setUser(convertedUser));
				localStorage.setItem('user', JSON.stringify(user));
			}
		});
		return unsubscribe;
	}, [dramasStatus, dispatch, auth, user]);

	return (
		<div className='App'>
			<Layout>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='dramas/:dramaId' element={<Drama />}></Route>
					<Route path='favorite' element={<Favorite />}></Route>
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
