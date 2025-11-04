import { OrderStatus, useCreateOrderMutation, useEditOrderMutation, useGetOrderQuery } from '@/api/orderApi';
import { useFetchProductsQuery } from '@/api/productsApi';
import { Summary } from '@/components/Summary';
import { Button } from '@/components/ui/button';
import useIsMobile from '@/hooks/useIsMobileHook';
import { useOrderHook } from '@/hooks/useOrderHook';
import { selectCart } from '@/store/cart';
import priceToDecimal from '@/utils/priceToDecimal';
import clsx from 'clsx';
import { useEffect, type FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Checkout: FC = () => {
	const cart = useSelector(selectCart);
	const isMobile = useIsMobile();
	const navigate = useNavigate();

	const { orderId, setOrderId } = useOrderHook();

	const {
		data: order,
		isError: isOrderError,
		isSuccess: isOrderSuccess,
	} = useGetOrderQuery(orderId!, {
		skip: !orderId,
	});

	const { data: products, isLoading, error } = useFetchProductsQuery();
	const [createOrder] = useCreateOrderMutation();
	const [editOrder] = useEditOrderMutation();

	const handleOrder = async () => {
		const products = cart.map((item) => {
			return { id: item.id, quantity: item.quantity };
		});
		const order = !orderId
			? await createOrder({ products }).unwrap()
			: await editOrder({ id: orderId, body: { products } }).unwrap();

		setOrderId(order.id);
		navigate(`/payment/${order.id}`);
	};

	// handle order state changes
	useEffect(() => {
		if (!orderId) return;

		if (isOrderError) {
			console.log('is Error');
			setOrderId('');
			return;
		}

		if (isOrderSuccess && order) {
			if (order.status === OrderStatus.COMPLETED) {
				setOrderId('');
			} else {
				console.log('use the same order id');
			}
		}
	}, [isOrderError, isOrderSuccess, order, orderId, setOrderId]);

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (error || !products) {
		return <div>Error loading products.</div>;
	}

	return (
		<div className="flex w-full flex-row justify-center">
			<div
				className={clsx('flex flex-col p-4 bg-neutral-800 rounded-md text-white', isMobile ? 'w-full mx-3' : 'w-1/3')}
			>
				<h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

				<Summary />

				<div className="flex justify-between border-gray-700 font-bold text-lg pb-2">
					<span>Total</span>
					<span>
						{priceToDecimal(
							cart.reduce((total: number, product) => total + products[product.id].price * product.quantity, 0),
						)}{' '}
						€
					</span>
				</div>

				{/* Need to create command in backend */}
				<Button className="font-semibold" variant="secondary" onClick={() => handleOrder()}>
					Commander
				</Button>
			</div>
		</div>
	);
};
