import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Outlet } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);

export default function StripeLayout() {
	return (
		<Elements stripe={stripePromise}>
			<Outlet />
		</Elements>
	);
}
