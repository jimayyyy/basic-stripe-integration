import { selectCart } from '@/store/cart';
import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSignIcon, ShoppingCart, X } from 'lucide-react';
import clsx from 'clsx';
import { closeSidebar, isSidebarOpen } from '@/store/sidebar';
import { Button } from '../ui/button';
import { SidebarCard } from './components/SidebarCard';
import { useNavigate } from 'react-router-dom';
import { useCartHook } from '@/hooks/useCartHook';
import { useFetchProductsQuery } from '@/api/productsApi';

export const Sidebar: FC = () => {
	const cart = useSelector(selectCart);
	const isOpen = useSelector(isSidebarOpen);
	const { data: products, isLoading, error } = useFetchProductsQuery();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onClose = () => dispatch(closeSidebar());
	const { resetCart } = useCartHook();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (error || !products) {
		return <div>Error loading products.</div>;
	}

	return (
		<>
			<div
				className={clsx(
					'fixed inset-0 bg-black z-40 transition-opacity duration-300',
					isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none',
				)}
				onClick={() => onClose()}
			/>
			<div
				className={clsx(
					'fixed left-0 top-0 h-full bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300',
					isOpen ? 'translate-x-0' : '-translate-x-full',
					'w-full md:w-[400px]',
				)}
			>
				<div className="w-full min-h-15 bg-neutral-800 flex items-center justify-center relative">
					<span style={{ fontFamily: 'lobster' }} className="text-4xl drop-shadow-md">
						Mon panier
					</span>

					<Button variant="ghost" className="absolute right-3 text-white hover:bg-stone-700" onClick={() => onClose()}>
						<X />
					</Button>
				</div>

				<div className="flex flex-col items-center gap-4 p-4 overflow-scroll">
					{cart.map((cartItem) => (
						<SidebarCard
							key={cartItem.name}
							name={cartItem.name}
							quantity={cartItem.quantity}
							image={products[cartItem.name]?.image}
						/>
					))}
				</div>

				<div className="w-full min-h-15 bg-neutral-800 mt-auto gap-2 flex items-center justify-center relative">
					<Button className="text-lg font-semibold" disabled={cart.length === 0} onClick={() => resetCart()}>
						Vider
						<ShoppingCart />
					</Button>
					<Button
						className="text-lg font-semibold"
						disabled={cart.length === 0}
						onClick={() => {
							navigate('/checkout');
							onClose();
						}}
					>
						Paiement
						<DollarSignIcon />
					</Button>
				</div>
			</div>
		</>
	);
};
