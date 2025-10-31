import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	providers: [PaymentService],
	controllers: [PaymentController],
	imports: [PrismaModule],
	exports: [PaymentService],
})
export class PaymentModule {}
