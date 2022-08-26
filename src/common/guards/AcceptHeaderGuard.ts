import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AcceptHeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const headerIsAcceptable = req.headers['accept'] === 'application/json';
    if (!headerIsAcceptable) {
      throw new NotAcceptableException({
        status: 406,
        Message: "Accept header must be 'application/json'",
      });
    }
    return true;
  }
}
