import type { FC } from 'react';

export const Navbar: FC = () => {
	return (
		<div className="w-full bg-stone-500 shadow-2xl font-bold text-3xl fixed top-0 h-15 flex items-center justify-center">
			<span style={{ fontFamily: 'lobster' }} className="text-4xl tracking-wider drop-shadow-md">
				My Coffee Shop
			</span>
		</div>
	);
};
