import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';

@Module({
	imports: [OrdersModule, ProductModule],
	controllers: [AppController],
	providers: [AppService, ProductService, PrismaService, OrdersService],
})
export class AppModule {}
