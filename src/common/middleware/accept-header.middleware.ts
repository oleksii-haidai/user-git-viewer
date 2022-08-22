import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check if the Accept header is set to application/json
 */
@Injectable()
export class AcceptHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['accept'] === 'application/json') {
      next();
    } else {
      res.status(406).json({
        status: 406,
        Message: `Accept header must be 'application/json'`,
      });
    }
  }
}
