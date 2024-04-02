'use client'
import React, { useState, useEffect } from 'react';
import Chart from '../tmp.jsx';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import RequireAuth from 'react-auth-kit';
interface MyData {
	id: number;
	name: string;
	email: string;
}

const Default: React.FC<{}> = ({ }) => {
	const router = useRouter()

	const logout = () => {
		// logout logic
	};

	// State to store data and loading status
	const [data, setData] = useState<MyData | null>(
		null);
	const [loading, setLoading] = useState(true);

	// Function to fetch data
	const fetchData = async () => {
		try {
			const response = await axios.get<MyData>('/api/data'); // Replace '/api/data' with your actual endpoint
			setData(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Fetch data when component mounts
		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}


	return (
		<div className='header'>
			<div className='logo'>
				<img id='logo' src='archive/logos/logo1' width='15%' />
				<img id='logo' src='archive/logos/logo2' width='15%' />
			</div>
			<div /*onClick={logout}*/ className='logout'>
				<p>Logout</p>
				<img src='archive/logout-icon.webp' width='25' style={{ paddingLeft: '5px' }} />
			</div>

			<div className='chart_con_l1'>
				<div className='chart_con_l2'>
					<div>
						<div className='chart_header'>
							<h1>WEEKLY REPORT</h1>
							<p id='week' style={{ fontSize: '13' }}></p>
							<h1 id='comp_name'>{ }</h1>
						</div>
						<div className='charts'>
							<div className='individual_chart_con chart2'>
								<Chart labels={data} type='Bar' />
							</div>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div className='individual_chart_con chart4'>
									<h3 id='chart4_title'>Weekly Meetings Booked</h3>
									<h1 id='chart_4_num'>Error</h1>
								</div>
								<div className='individual_chart_con chart4'>
									<h3 id='chart4_title'>Weekly Meetings Executed</h3>
									<h1 id='chart_5_num'>Error</h1>
								</div>
							</div>

							<div className='individual_chart_con chart3'>
								<Chart labels={data} type='Doughnut' />
							</div>
							<div className='individual_chart_con chart5'>
								<h3 id='chart5_title'>Warm leads</h3>
								<table id='table'>
									{/* Add table content here */}
								</table>
							</div>
						</div>
						<div className='chart_header'>
							<h1>LEADS TO DATE<p id='week_leads' style={{ fontSize: '13' }}></p></h1>
						</div>
						<div className='charts'>
							<div className='individual_chart_con chart6'>
								<table id='table_extended'>
									<thead>
										<tr>
											<th>Opportunity</th>
											<th>Position</th>
											<th>City</th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


function PrivatePage() {
	const store = createStore({
		authName: '_auth',
		authType: 'cookie',
		cookieDomain: window.location.hostname,
		cookieSecure: false,
	});
	return (
		<AuthProvider store={store}>
			<RequireAuth  store={store}>
				<Default />
			</RequireAuth>

		</AuthProvider>
	);
}
export default PrivatePage;
