'use client'
// index.tsx or index.js (root file)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './page2'; // Import the main App component

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
  );

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
