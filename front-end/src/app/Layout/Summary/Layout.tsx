import useIsMobile from '@/hooks/useIsMobileHook';
import { type FC, type ReactNode } from 'react';
import { Summary } from './components/SummaryList';
import type { CartItem } from '@/store/cart';
import { cn } from '@/lib/utils';

interface SummaryLayoutProps {
	title: string;
	showSummary?: boolean;
	editable?: boolean;
	items?: CartItem[];
	children: ReactNode;
}

export const SummaryLayout: FC<SummaryLayoutProps> = ({
	title,
	showSummary = true,
	editable = false,
	items,
	children,
}) => {
	const isMobile = useIsMobile();

	return (
		<div className="flex w-full flex-row justify-center">
			<div className={cn('flex flex-col p-4 bg-neutral-800 rounded-md text-white', isMobile ? 'w-full mx-3' : 'w-1/3')}>
				<h2 className="text-xl font-bold mb-4">{title}</h2>

				{showSummary && <Summary editable={editable} items={items} />}

				{children}
			</div>
		</div>
	);
};
