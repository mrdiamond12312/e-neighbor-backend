import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

import { MetaResponseDto, ResponseDto } from '@/common/dtos/response.dto';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode as number;

        const meta = new MetaResponseDto(statusCode);

        return new ResponseDto<typeof data>(data, meta);
      }),
    );
  }
}
