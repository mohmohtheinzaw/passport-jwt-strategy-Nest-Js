import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';

@Module({})
export class PaginationModule {
  providers: [PaginationService];
  //cexports: [PaginationService];
}
