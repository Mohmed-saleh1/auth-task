import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsInt } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'The current page number (default: 1)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'The number of items per page (default: 10)',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
