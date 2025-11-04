import { useState, type FC, type FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCreatePaymentIntentMutation } from '@/api/paymentApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderHook } from '@/hooks/useOrderHook';
import { Summary } from '@/components/Summary';
import clsx from 'clsx';
import useIsMobile from '@/hooks/useIsMobileHook';
import priceToDecimal from '@/utils/priceToDecimal';
import { useCartHook } from '@/hooks/useCartHook';

export const Payment: FC = () => {
	const stripe = useStripe();
	const elements = useElements();
	const isMobile = useIsMobile();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [createIntent] = useCreatePaymentIntentMutation();
	const { totalPrice } = useCartHook();
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
		<form onSubmit={handleSubmit} className="flex w-full flex-row justify-center">
			<div
				className={clsx('flex flex-col p-4 bg-neutral-800 rounded-md text-white', isMobile ? 'w-full mx-3' : 'w-1/3')}
			>
				<h2 className="text-xl font-bold mb-4">Finalisation de la commande</h2>
				<Summary />
				<div className=" border border-white px-3 py-2 rounded-lg mb-2">
					<CardElement
						options={{
							style: {
								base: {
									color: '#fff',
								},
								invalid: {
									color: '#ff4d4f',
									iconColor: '#ff4d4f',
								},
							},
						}}
						className="text-white"
					/>
				</div>

				<Button type="submit" className="w-full font-semibold" variant="secondary" disabled={!stripe || loading}>
					{loading ? 'Paiement en cours...' : `Payer ${priceToDecimal(totalPrice)} €`}
				</Button>
			</div>
		</form>
	);
};
