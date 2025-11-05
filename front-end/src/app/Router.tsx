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
import { Checkout } from '@/pages/Checkout/Checkout';
import { Payment } from '@/pages/Payment/Payment';
import StripeLayout from './Layout/Stripe/Layout';
import { Confirmation } from '@/pages/Confirmation/Confirmation';
import CartLayout from './Layout/Cart/Layout';

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

			<Route element={<CartLayout />}>
				<Route path="/checkout" element={<Checkout />} />
			</Route>

			<Route element={<StripeLayout />}>
				<Route path="/payment/:id" element={<Payment />} />
			</Route>

			<Route path="/confirmation/:id" element={<Confirmation />} />

			<Route path="*" element={<Navigate to="/" replace />} />
		</Route>,
	),
);

const AppRouter: FC = () => <RouterProvider router={router} />;

export default AppRouter;
