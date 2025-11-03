import { selectOrderId, setOrderId } from '@/store/order';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useOrderHook = () => {
	const dispatch = useDispatch();
	const orderId = useSelector((state: RootState) => selectOrderId(state));

	return {
		setOrderId: (orderId: string) => dispatch(setOrderId(orderId)),
		orderId,
	};
};
