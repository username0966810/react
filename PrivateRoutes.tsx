'use client'
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthContext';

function PrivateRouting() {
	const { isAuthenticated } = useAuth();
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    );
}
function PrivateRoutes() {
	return(
		<AuthProvider>
			<PrivateRouting />
		</AuthProvider>
	);
};
export default PrivateRoutes;