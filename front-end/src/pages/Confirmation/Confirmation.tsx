import { SummaryLayout } from '@/app/Layout/Summary/Layout';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Confirmation: FC = () => {
	const navigate = useNavigate();

	return (
		<SummaryLayout title="Merci pour votre commande !">
			<div className="flex justify-center border-gray-700 font-bold text-lg pb-2 mt-2">
				<span>Un mail récapitulatif vous sera envoyer !</span>
			</div>

			<Button className="font-semibold w-full mt-3" variant="secondary" onClick={() => navigate('/')}>
				Accueil
			</Button>
		</SummaryLayout>
	);
};
