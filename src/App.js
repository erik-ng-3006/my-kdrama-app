import { useEffect } from 'react';
import './App.css';
import Drama from './routes/Drama';
import { fetchDramas } from './app/dramaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/routes/Home';

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
			<Routes>
				<Route path='/' element={<Home />}></Route>
			</Routes>
		</div>
	);
}

export default App;
