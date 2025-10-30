import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [PrismaModule],
	exports: [OrdersService],
})
export class OrdersModule {}
