import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  totalPage(totalData: number, perPage: number): number {
    let totalPage = Math.ceil(totalData / perPage);
    totalPage = totalPage === 0 ? 0 : totalPage;
    return totalPage;
  }
}
