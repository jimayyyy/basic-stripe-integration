export function priceToDecimal(cents: number | string, decimals = 2): number {
	const parsed = typeof cents === 'string' ? Number(cents.trim()) : cents;
	if (!Number.isFinite(parsed)) {
		throw new TypeError('priceToDecimal: "cents" must be a finite number or numeric string');
	}

	const result = parsed / 100;
	return Number(result.toFixed(decimals));
}
