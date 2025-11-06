import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// raw data required by stripe
	app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }));
	app.use(bodyParser.json());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	app.enableCors({
		origin: ['http://localhost:5173', 'http://localhost:2000'],
		credentials: true,
	});

	await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
