import type { FC } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
	Navigate,
} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Navbar } from '../components/Navbar';

const Wrapper: FC = () => {
	return (
		<>
			<Navbar />
			<div className="pt-18">
				<Outlet />
			</div>
		</>
	);
};

const Error: FC = () => {
	return <></>;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Wrapper />} errorElement={<Error />}>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Route>,
	),
);

const AppRouter: FC = () => <RouterProvider router={router} />;

export default AppRouter;
