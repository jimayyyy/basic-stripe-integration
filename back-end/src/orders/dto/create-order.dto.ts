import { IsArray, IsUUID, ValidateNested, IsInt, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderProductDto {
	@IsUUID()
	readonly id: string;

	@IsInt()
	@Min(1)
	readonly quantity: number;
}

export class CreatePendingOrderDto {
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => OrderProductDto)
	readonly products: OrderProductDto[];
}
