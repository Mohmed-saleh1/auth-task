import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Optional product name',
    example: 'Smartphone Pro',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Optional product description',
    example: 'Updated description',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Optional product price',
    example: 599.99,
  })
  price?: number;

  @ApiPropertyOptional({ description: 'Optional stock quantity', example: 100 })
  stock?: number;
}
