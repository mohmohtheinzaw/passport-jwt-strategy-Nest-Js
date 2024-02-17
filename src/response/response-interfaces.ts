import { HttpStatus } from '@nestjs/common';

export interface IResponseMetadata {
    statusCode?: HttpStatus;
    message?: string;
  }
  
  export interface IResponse {
    metadata?: IResponseMetadata;
    data?: Record<string, any>;
  }