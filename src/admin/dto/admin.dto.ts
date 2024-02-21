import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { ONLINEORDERSTATUS } from '@prisma/client';
import { PageOptionsDto } from 'src/constant/pagination.dto';

export class AdminUpdateInput {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  name?: string;
}

export class FetchAdmin extends IntersectionType(PageOptionsDto) {}

export class OrderConfirm {
  @ApiProperty()
  status: ONLINEORDERSTATUS;

  @ApiProperty()
  deliveredDate: Date;
}
