import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
	{
		name: 'T-shirt',
		description: '100% cotton T-shirt, available in several sizes',
		price: 2000,
	},
	{
		name: 'Mug',
		description: 'Ceramic coffee mug — 350ml, dishwasher safe',
		price: 1850,
	},
	{
		name: 'Notebook',
		description: 'A5 ruled notebook — 100 pages, recycled paper',
		price: 999,
	},
	{
		name: 'Sticker pack',
		description: 'Set of 10 assorted stickers',
		price: 299,
	},
	{
		name: 'Hoodie',
		description: 'Comfort-fit hoodie with printed logo',
		price: 2999,
	},
];

async function main() {
	console.log('[PRODUCT] Seeding products...');

	for (const p of products) {
		await prisma.product.upsert({
			where: { name: p.name },
			update: p,
			create: p,
		});
	}

	console.log('[PRODUCT] Seeding finished.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
