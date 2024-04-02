'use client'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './login/page';
import PrivatePage from './home/page';
import RequireAuth from 'react-auth-kit'; // Make sure this import is correct
import createStore from 'react-auth-kit/createStore';

const store = createStore({
	authName: '_auth',
	authType: 'cookie',
	cookieDomain: window.location.hostname,
	cookieSecure: false,
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route
					path="/home"
					element={
						<RequireAuth store={store} >
							<PrivatePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
