import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GitServiceCreator } from '../common/git-service/gitServiceCreator';
import { GitServiceFactory } from '../common/git-service/gitServiceFactory';
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

describe('RepositoryViewerService', () => {
  let service: RepositoryViewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryViewerService, GitServiceFactory],
    }).compile();

    service = module.get<RepositoryViewerService>(RepositoryViewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of repositories', async () => {
    Reflect.set(service, '_gitRepositoryApi', {
      getUserRepositoriesWithBranches: () => Promise.resolve(successResponse),
    } as unknown as GitServiceCreator);

    expect(await service.getRepositories('git')).toEqual(successResponse);
  });

  it('should throw an error', async () => {
    Reflect.set(service, '_gitRepositoryApi', {
      getUserRepositoriesWithBranches: () => Promise.reject({ status: 404 }),
    } as unknown as GitServiceCreator);

    await expect(service.getRepositories('git')).rejects.toThrow(
      new NotFoundException({ status: 404, Message: 'User not found' }),
    );

    Reflect.set(service, '_gitRepositoryApi', {
      getUserRepositoriesWithBranches: () =>
        Promise.reject(new InternalServerErrorException()),
    } as unknown as GitServiceCreator);

    await expect(service.getRepositories('git')).rejects.toThrow(
      new InternalServerErrorException(),
    );
  });

  it('should return repository api', async () => {
    expect(service.gitRepositoryApi).toBeInstanceOf(GitServiceCreator);
  });
});
