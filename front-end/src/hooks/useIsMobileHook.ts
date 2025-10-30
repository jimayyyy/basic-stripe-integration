import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint: number = 768) => {
	const [isMobile, setIsMobile] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth <= breakpoint;
		}
		return false;
	});

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= breakpoint);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [breakpoint]);

	return isMobile;
};

export default useIsMobile;
