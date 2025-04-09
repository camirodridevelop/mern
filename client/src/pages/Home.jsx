import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<>
			<div className="mx-2 d-flex  flex-column align-items-center">
				<h3>
					Home - Bienvenido{' '}
					<span className="text-primary">{user.firstname + ' ' + user.lastname}</span>
				</h3>
				<button className="btn btn-danger w-50 mt-3" onClick={logout}>Cerrar Sesion</button>
			</div>
		</>
	);
};

export default Home;
