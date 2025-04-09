import { useState, createContext } from 'react';
import { getMeFetch } from '../api/getMeFetch';
import { useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// usuario estatico (de momento no existe)
	const [user, setUser] = useState(null);
	//loading
	const [loading, setLoading] = useState(true);

	//relogin
	useEffect(() => {

		(async () =>{ 
		const token = localStorage.getItem("token");
		await login (token);
		setLoading(false);
		})();

	 },[]);

	// los datos para utilizar en todo el sitio web login
	const login = async (token) =>{
		try {
			const user = await getMeFetch(token);
			delete user.password;
			setUser (user);
		} catch(error){
			console.log(error);
		}
	};

//logout
	const logout = ( ) => {
		setUser(false)
		localStorage.clear()
	};

	if (loading) return null;

	//los datos para utilizar en todo el sitio web lo exportamos
	const data ={
		user,
		setUser,
		login,
		logout,
	};

	

	// el contexto
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
