import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ONLINEORDERSTATUS } from '@prisma/client';
import { PageOptionsDto } from 'src/constant/pagination.dto';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SearchDto {
  @ApiPropertyOptional({
    example: 'Product One',
  })
  @Type(() => String)
  @IsOptional()
  readonly search?: string = '';
}

export class AdminUpdateInput {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  name?: string;
}

export class FetchAdmin extends IntersectionType(PageOptionsDto, SearchDto) {}

export class OrderConfirm {
  @ApiProperty()
  status: ONLINEORDERSTATUS;

  @ApiProperty()
  deliveredDate: Date;
}
