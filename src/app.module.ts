import { Module } from '@nestjs/common';
import { RepositoryViewerModule } from './repository-viewer/repository-viewer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RepositoryViewerModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
