import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GitServiceFactory } from '../common/git-service/gitServiceFactory';

import { AcceptHeaderMiddleware } from '../common/middleware/accept-header.middleware';
import { RepositoryViewerController } from './repository-viewer.controller';
import { RepositoryViewerService } from './repository-viewer.service';

@Module({
  controllers: [RepositoryViewerController],
  providers: [RepositoryViewerService, GitServiceFactory],
})
export class RepositoryViewerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AcceptHeaderMiddleware).forRoutes('repos');
  }
}
