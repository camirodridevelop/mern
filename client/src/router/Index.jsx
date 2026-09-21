import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from '../pages/RegisterForm';
import LoginForm from '../pages/LoginForm';
import Home from '../pages/Home';
import { AuthContext } from '../context/AuthContext';

/* 
configura las rutas de la aplicación para mostrar diferentes componentes según la URL actual. 
*/
const AppRouter = () => {
	const { user } = useContext(AuthContext);

	return (
		<Routes>
			<Route path="/" element={<RegisterForm />} />
			<Route path="/login" element={<LoginForm />} />
			{/* /home solo es accesible con sesión iniciada */}
			<Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
			<Route path="*" element={<LoginForm />} />
		</Routes>
	);
};

export default AppRouter;
