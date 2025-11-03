import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { OrderProductDto } from './create-order.dto';
import { Type } from 'class-transformer';

export class EditOrderDto {
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => OrderProductDto)
	readonly products: OrderProductDto[];
}
