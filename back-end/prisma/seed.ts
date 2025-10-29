import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
	{
		name: 'T-shirt',
		description: '100% cotton T-shirt, available in several sizes',
	},
	{
		name: 'Mug',
		description: 'Ceramic coffee mug — 350ml, dishwasher safe',
	},
	{
		name: 'Notebook',
		description: 'A5 ruled notebook — 100 pages, recycled paper',
	},
	{
		name: 'Sticker pack',
		description: 'Set of 10 assorted stickers',
	},
	{
		name: 'Hoodie',
		description: 'Comfort-fit hoodie with printed logo',
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
