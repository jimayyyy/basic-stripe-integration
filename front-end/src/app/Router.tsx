import type { FC } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
	Navigate,
} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Home } from '@/pages/Home/Home';

const Wrapper: FC = () => {
	return (
		<>
			<Sidebar />
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
			<Route path="/checkout" element={<></>} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Route>,
	),
);

const AppRouter: FC = () => <RouterProvider router={router} />;

export default AppRouter;
