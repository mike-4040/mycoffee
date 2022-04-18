import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (data: number, ctx: ExecutionContext) => {
    console.log(data);
    return ctx.switchToHttp().getRequest().protocol;
  },
);
