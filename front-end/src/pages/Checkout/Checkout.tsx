import { OrderStatus, useCreateOrderMutation, useEditOrderMutation, useGetOrderQuery } from '@/api/orderApi';
import { SummaryLayout } from '@/app/Layout/Summary/Layout';
import { Button } from '@/components/ui/button';
import { useCartHook } from '@/hooks/useCartHook';
import { useOrderHook } from '@/hooks/useOrderHook';
import { priceToDecimal } from '@/lib/priceToDecimal';
import { useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Checkout: FC = () => {
	const { cart, totalPrice } = useCartHook();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { orderId, setOrderId } = useOrderHook();

	const {
		data: order,
		isError: isOrderError,
		isSuccess: isOrderSuccess,
	} = useGetOrderQuery(orderId!, {
		skip: !orderId,
	});

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
			setOrderId('');
			return;
		}

		if (isOrderSuccess && order && order.status === OrderStatus.COMPLETED) {
			setOrderId('');
		}
	}, [isOrderError, isOrderSuccess, order, orderId, setOrderId]);

	return (
		<SummaryLayout title={t('checkout.summary')} editable={true}>
			<div className="flex justify-between border-gray-700 font-bold text-lg pb-2 mt-2">
				<span>Total</span>
				<span>{priceToDecimal(totalPrice)}€</span>
			</div>

			<Button className="font-semibold w-full mt-3" variant="secondary" onClick={() => handleOrder()}>
				Commander
			</Button>
		</SummaryLayout>
	);
};
