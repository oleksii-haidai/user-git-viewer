import { Module } from '@nestjs/common';
import { GitServiceFactory } from '../common/git-service/gitServiceFactory';
import { RepositoryViewerController } from './repository-viewer.controller';
import { RepositoryViewerService } from './repository-viewer.service';

@Module({
  controllers: [RepositoryViewerController],
  providers: [RepositoryViewerService, GitServiceFactory],
})
export class RepositoryViewerModule {}
