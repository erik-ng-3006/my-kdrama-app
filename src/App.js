import { useEffect } from 'react';
import './App.css';
import { fetchDramas } from './app/dramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/routes/Home';
import Layout from './Layout/Layout';
import Drama from './routes/Drama';

function App() {
	const dramasStatus = useSelector((state) => state.dramas.status);
	const dispatch = useDispatch();

	useEffect(() => {
		if (dramasStatus === 'idle') {
			dispatch(fetchDramas());
		}
	}, [dramasStatus, dispatch]);

	return (
		<div className='App'>
			<Layout>
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
