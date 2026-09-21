import { useState, useEffect, createContext } from 'react';
import { getMeFetch } from '../api/getMeFetch';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// usuario logueado (null si no hay sesión)
	const [user, setUser] = useState(null);
	// mientras se comprueba si hay una sesión guardada
	const [loading, setLoading] = useState(true);

	// obtiene los datos del usuario a partir del token
	const login = async (token) => {
		try {
			const user = await getMeFetch(token);
			delete user.password;
			setUser(user);
		} catch (error) {
			// token inválido o vencido: se limpia la sesión guardada
			localStorage.removeItem('token');
			setUser(null);
			throw error;
		}
	};

	// al abrir el sitio, restaura la sesión si hay un token guardado
	useEffect(() => {
		(async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					await login(token);
				} catch (error) {
					console.log(error);
				}
			}
			setLoading(false);
		})();
	}, []);

	// cerrar sesión
	const logout = () => {
		setUser(null);
		localStorage.removeItem('token');
	};

	if (loading) return null;

	// los datos que se comparten en todo el sitio web
	const data = {
		user,
		setUser,
		login,
		logout,
	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
