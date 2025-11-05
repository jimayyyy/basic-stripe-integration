import { useGetOrderQuery } from '@/api/orderApi';
import { SummaryLayout } from '@/app/Layout/Summary/Layout';
import { Button } from '@/components/ui/button';
import { castOrderItemToProductItem } from '@/lib/utils';
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Confirmation: FC = () => {
	const navigate = useNavigate();
	const { id: orderId } = useParams();

	const {
		data: order,
		isLoading,
		isError,
	} = useGetOrderQuery(orderId!, {
		skip: !orderId,
	});

	if (isLoading || isError || !order?.items.length) {
		return <></>;
	}

	return (
		<SummaryLayout title="Merci pour votre commande !" items={castOrderItemToProductItem(order?.items)}>
			<div className="flex justify-center border-gray-700 font-bold text-lg pb-2 mt-2">
				<span>Un mail récapitulatif vous sera envoyer !</span>
			</div>

			<Button className="font-semibold w-full mt-3" variant="secondary" onClick={() => navigate('/')}>
				Accueil
			</Button>
		</SummaryLayout>
	);
};
