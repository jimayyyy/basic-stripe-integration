import { Navigate, Outlet } from 'react-router-dom';
import { useCartHook } from '@/hooks/useCartHook';
import type { FC } from 'react';

const CartLayout: FC = () => {
	const { cart } = useCartHook();

	if (!cart.length) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default CartLayout;
