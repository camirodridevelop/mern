import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);

