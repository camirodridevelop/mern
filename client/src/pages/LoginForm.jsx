import {useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginFech } from '../api/loginFecth';
import { AuthContext } from '../context/AuthContext';


const LoginForm = () => {

	const { login }= useContext(AuthContext);

	const navigate = useNavigate();
	/* 
	datos del formulario
   */
	const [formData, setFormData] = useState({
		email: 'yara@test.com',
		password: '123456',
	});

	/* 
	validacion de formulario y navegacion entre las rutas
   */
	const [error, setError] = useState(null);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	/* 
	obtener los datos del formulario de login
   */
	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			const {access_token} = await loginFech(formData);
			login(access_token);

			//mantener la sesion con localstorage
			localStorage.setItem("token" ,access_token);
			setError("");
			navigate("/home");
		 		 
		} catch (error){ 
		console.log(error)
		setError("Error de servidor");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>
			{error && <p className="alert alert-danger">{error}</p>}
			<button type="submit">Login</button>
			<p>
				¿No tienes una cuenta? <Link to="/">Regístrate</Link>
			</p>
		</form>
	);
};

export default LoginForm;
