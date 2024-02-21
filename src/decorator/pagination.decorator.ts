import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { PAGINATION_MAX_PER_PAGE } from 'src/constant/pagination.constant';

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const size = parseInt(req.query.size as string);

    // check if page and size are valid
    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
      throw new BadRequestException({ message: 'Invalid pagination params' });
    }
    // do not allow to fetch large slices of the dataset
    if (size > PAGINATION_MAX_PER_PAGE) {
      throw new BadRequestException({
        message: "'Invalid pagination params: Max size is 100'",
      });
    }

    // calculate pagination parameters
    const limit = size;
    const offset = page === 1 ? 0 : (page - 1) * limit;
    return { page, limit, size, offset };
  },
);
