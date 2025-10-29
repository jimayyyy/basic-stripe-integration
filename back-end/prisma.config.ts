import { defineConfig, env } from 'prisma/config';
import { config } from 'dotenv';

config();

export default defineConfig({
	schema: './prisma/',
	migrations: {
		path: 'prisma/migrations',
		seed: 'ts-node --transpile-only ./prisma/seed.ts',
	},
	// engine: 'classic',
	datasource: {
		url: env('DATABASE_URL'),
	},
});
