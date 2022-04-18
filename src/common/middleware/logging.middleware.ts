import { Injectable, NestMiddleware } from '@nestjs/common';

const TIMER_LABEL = 'req-res time';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time(TIMER_LABEL);
    console.log('Middleware');
    res.on('finish', () => console.timeEnd(TIMER_LABEL));
    next();
  }
}
