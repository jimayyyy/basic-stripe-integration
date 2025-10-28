import { selectCart } from '@/store/cart';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusIcon, PlusIcon, X } from 'lucide-react';
import { Button } from './ui/button';
import clsx from 'clsx';
import { closeSidebar, isSidebarOpen } from '@/store/sidebar';

export const Sidebar: FC = () => {
	const products = useSelector(selectCart);
	const dispatch = useDispatch();
	const isOpen = useSelector(isSidebarOpen);
	const onClose = () => dispatch(closeSidebar());

	return (
		<>
			<div
				className={clsx(
					'fixed inset-0 bg-black z-40 transition-opacity duration-300',
					isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none',
				)}
				onClick={onClose}
			/>
			<div
				className={clsx(
					'fixed left-0 top-0 h-full w-[400px] bg-neutral-900 z-50 shadow-2xl flex flex-col transform transition-transform duration-300',
					isOpen ? 'translate-x-0' : 'translate-x-[-400px]',
				)}
			>
				{/* Header */}
				<div className="w-full h-15 bg-gray-500 flex items-center justify-center relative">
					<div className="text-white font-semibold text-lg">Checkout</div>
					<Button variant="ghost" className="absolute right-3 text-white hover:bg-gray-600">
						<X />
					</Button>
				</div>

				{/* Product list */}
				<div className="flex flex-col items-center gap-4 p-4">
					{products.map((product) => (
						<div className="w-full max-w-md  bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
							<img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />

							<div className="flex flex-row gap-2">
								<div className="flex flex-col flex-1 items-start">
									<span className="text-gray-900 font-medium">{product.title}</span>
									<span className="text-sm text-gray-500">Quantité : {product.quantity}</span>
								</div>

								<div className="flex flex-col items-center gap-2">
									<Button variant="default" size="sm" className="p-1 h-6 w-6 hover:bg-gray-600">
										<MinusIcon />
									</Button>
									<Button variant="default" size="sm" className="p-1 h-6 w-6 hover:bg-gray-600">
										<PlusIcon />
									</Button>
								</div>
							</div>

							<Button variant="default" className="ml-auto hover:bg-gray-600">
								<X />
							</Button>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
