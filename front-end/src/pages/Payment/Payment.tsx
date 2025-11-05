import { useState, type FC, type FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCreatePaymentIntentMutation } from '@/api/paymentApi';
import { useNavigate, useParams } from 'react-router-dom';
import priceToDecimal from '@/utils/priceToDecimal';
import { useCartHook } from '@/hooks/useCartHook';
import { SummaryLayout } from '@/app/Layout/Summary/Layout';
import { useOrderHook } from '@/hooks/useOrderHook';

export const Payment: FC = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [createIntent] = useCreatePaymentIntentMutation();
	const { totalPrice, resetCart } = useCartHook();
	const { setOrderId } = useOrderHook();

	const { id } = useParams();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { clientSecret } = await createIntent({ orderId: id ?? '' }).unwrap();
			const card = elements?.getElement(CardElement);

			if (card && clientSecret) {
				const paymentResult = await stripe?.confirmCardPayment(clientSecret, {
					payment_method: { card },
				});

				if (paymentResult?.error) {
					console.error(paymentResult.error.message);
					setTimeout(() => {
						setLoading(false);
					}, 2000);
				} else {
					if (paymentResult?.paymentIntent.status === 'succeeded') {
						resetCart();
						setOrderId('');
						navigate(`/confirmation/${id}`);
					}
				}
			} else {
				throw new Error('Client secret is missing or card element is not available.');
			}
		} catch (err) {
			console.error('error:', err);
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<SummaryLayout title="Finalisation de la commande">
				<div className="border border-white px-3 py-2 rounded-lg my-2">
					<CardElement
						options={{
							style: { base: { color: '#fff' }, invalid: { color: '#ff4d4f', iconColor: '#ff4d4f' } },
						}}
					/>
				</div>

				<Button type="submit" disabled={!stripe || loading} className="w-full font-semibold mt-2" variant="secondary">
					{loading ? 'Paiement en cours...' : `Payer ${priceToDecimal(totalPrice)} €`}
				</Button>
			</SummaryLayout>
		</form>
	);
};
