import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import { RepositoryViewerModule } from '../src/repository-viewer/repository-viewer.module';
import { RepositoryViewerService } from '../src/repository-viewer/repository-viewer.service';
import { AppModule } from '../src/app.module';

const responseObject = {
  name: 'nestjs',
  ownerLogin: 'nestjs',
  branches: [
    {
      name: 'master',
      lastCommit: 'test123',
    },
  ],
};

describe('Repository viewer', () => {
  let app: INestApplication;
  const service = {
    useGitService: () => {
      return {
        getRepositories: () => {
          return Promise.resolve([responseObject]);
        },
      };
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RepositoryViewerService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET repos`, () => {
    return request(app.getHttpServer())
      .get('/repos/testuser')
      .set('Accept', 'application/json')
      .expect(200)
      .expect([responseObject]);
  });

  afterAll(async () => {
    await app.close();
  });
});
