import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Search {
  search?: string;
}

export const SearchParam = createParamDecorator(
  (validParams, ctx: ExecutionContext): Search => {
    const req: Request = ctx.switchToHttp().getRequest();
    const search = req.query.search as string;
    if (!search) return null;
    return { search };
  },
);
