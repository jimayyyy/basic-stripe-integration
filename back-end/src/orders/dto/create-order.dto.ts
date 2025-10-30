import { IsArray, IsUUID, ValidateNested, IsInt, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderProductDto {
	@IsUUID()
	readonly productId: string;

	@IsInt()
	@Min(1)
	readonly quantity: number;
}

export class CreatePendingOrderDto {
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateOrderProductDto)
	readonly products: CreateOrderProductDto[];
}
