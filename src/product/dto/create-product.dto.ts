import { IsString, IsNotEmpty, IsDecimal, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Smartphone' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'A high-end smartphone with 128GB storage',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price', example: 499.99 })
  @IsDecimal(
    { force_decimal: true },
    { message: 'Price must be a decimal number.' },
  )
  @Min(0, { message: 'Price must be a positive number.' })
  price: number;

  @ApiProperty({ description: 'Stock quantity', example: 50 })
  @IsInt()
  @Min(0, { message: 'Stock must be a non-negative integer.' })
  stock: number;
}
