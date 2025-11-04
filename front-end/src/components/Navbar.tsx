import type { FC } from 'react';

export const Navbar: FC = () => {
	return (
		<div className="w-full bg-neutral-800 shadow-2xl font-bold text-3xl fixed top-0 h-15 flex items-center justify-center">
			<span
				style={{
					fontFamily: 'lobster',
				}}
				className="text-4xl tracking-wider drop-shadow-md cursor-pointer select-none"
				onClick={() => console.log('toto')}
			>
				Super Café
			</span>
		</div>
	);
};
