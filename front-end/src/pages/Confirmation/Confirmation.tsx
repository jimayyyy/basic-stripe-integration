import type { FC } from 'react';
import { useParams } from 'react-router-dom';

export const Confirmation: FC = () => {
	const { id: orderId } = useParams();

	return <div className="flex w-full flex-row justify-center text-black"> {orderId}</div>;
};
