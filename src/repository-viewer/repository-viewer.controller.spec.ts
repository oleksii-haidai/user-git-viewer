import { Test, TestingModule } from '@nestjs/testing';
import { GitServiceFactory } from '../common/git-service/gitServiceFactory';
import { RepositoryViewerController } from './repository-viewer.controller';
import { RepositoryViewerService } from './repository-viewer.service';

const successResponse = [
  {
    name: 'nestjs',
    ownerLogin: 'nestjs',
    branches: [
      {
        name: 'master',
        lastCommit: 'test123',
      },
    ],
  },
];

describe('RepositoryViewerController', () => {
  let controller: RepositoryViewerController;
  let service: RepositoryViewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoryViewerController],
      providers: [RepositoryViewerService, GitServiceFactory],
    }).compile();

    controller = module.get<RepositoryViewerController>(
      RepositoryViewerController,
    );
    service = module.get<RepositoryViewerService>(RepositoryViewerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of repositories', async () => {
    jest
      .spyOn(service, 'getRepositories')
      .mockImplementation(() => Promise.resolve(successResponse));
    expect(await controller.getRepositories('git')).toEqual(successResponse);
  });
});
