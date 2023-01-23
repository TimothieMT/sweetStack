import './styles/App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageDashboard } from './pages/PageDashboard';
import { PageJobs } from './pages/PageJobs';
import { PageSkills } from './pages/PageSkills';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageLogin } from './pages/PageLogin';

function App() {
	return (
		<div className="App">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<h1>Get a Job</h1>
			<nav>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/jobs">Jobs</NavLink>
				<NavLink to="/skills">Skills</NavLink>
				<NavLink to="/login">Login</NavLink>
			</nav>

			<Routes>
				<Route path="/dashboard" element={<PageDashboard />} />
				<Route path="/jobs" element={<PageJobs />} />
				<Route path="/skills" element={<PageSkills />} />
				<Route path="/login" element={<PageLogin />} />
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;
