import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerFech } from '../api/registerFecth';

const RegisterForm = () => {
	/* 
	datos del formulario
   */
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	});

	/* 
	validacion de formulario
   */
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	/* 
	obtener los datos del formulario de registro
   */
	const handleSubmit = async (e) => {
		e.preventDefault();

		// data
		try{
			const res = await registerFech(formData);
			setSuccess(res.msg);
			setError("");
		} catch (error) {
			setSuccess("");
			setError(error.msg || 'Error de servidor');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Register</h2>
			<div>
				<input
					type="text"
					name="firstname"
					placeholder="Nombre"
					value={formData.firstname}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<input
					type="text"
					name="lastname"
					placeholder="Apellido"
					value={formData.lastname}
					onChange={handleInputChange}
				/>
			</div>
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
			{error && <p className="alert alert-danger mt-2">{error}</p>}
			<button type="submit">Register</button>
			{success && <p className="alert alert-success mt-2">{success}</p>}
			<p>
				¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
