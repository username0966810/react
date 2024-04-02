'use client'
import React, { useState, useEffect } from 'react';
//import { AuthProvider, useAuth } from './AuthContext';
import { useRouter, redirect } from 'next/navigation';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from 'axios'
import './index.css';

const LoginComp: React.FC = () => {
	const router = useRouter()
	//const navigate = useNavigate();
	//const { signin, isAuthenticated } = useAuth();
	const signIn = useSignIn();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('uname', username);
			formData.append('pword', password);

			const response = await fetch('my public domain', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Authentication failed');
			}

			const data = await response.json();
			const token = data.token;
			const expiry = data.expiry;

			// Check if token and expiry exist
			if (!token || !expiry) {
				throw new Error('Token or expiry not received');
			}
			
			if (signIn({
				auth: {
					token: token,
				},
			})) {
			}else{
				console.log('didnt work');
			}

			router.push('/home');
			console.log('worked');
		}
		catch (error) {
			setUsername('');
			setPassword('');
			throw new Error('error');
		}
	};
	return (
		<div className="container">
			<div className="content">
				<form id='form' onSubmit={handleLogin}>
					<img src='archive/logos/logo-salesperf.png' width='100%' alt='Salesperf Logo' /><br />
					<input id="uname" type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
					<input id="pword" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
					<p id="error"></p>
					<button id="submit" type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};
const LoginPage: React.FC = () => {
	const store = createStore({
		authName: '',
		authType: 'cookie',
		cookieDomain: window.location.hostname,
		cookieSecure: true,
	});
	return (
		<AuthProvider store={store}>
			<LoginComp />
		</AuthProvider>
	);
}
export default LoginPage;