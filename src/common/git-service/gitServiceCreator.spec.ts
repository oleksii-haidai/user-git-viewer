import { GitServiceApi } from '../types';
import { GitServiceCreator } from './gitServiceCreator';

describe('Git Service Creator', () => {
  let instance: GitServiceCreator;
  beforeEach(() => {
    jest.resetModules();
    instance = new TestClass();
  });

  it('should return repositories with branches', async () => {
    const repositories = await instance.getUserRepositoriesWithBranches('test');
    expect(repositories).toHaveLength(1);
    expect(repositories[0].name).toBe('test');
    expect(repositories[0].branches).toHaveLength(1);
    expect(repositories[0].branches[0].name).toBe('master');
  });
});

class TestClass extends GitServiceCreator {
  getGitRepositoryApi(): GitServiceApi {
    return {
      getAllUserRepositories: jest.fn().mockImplementation(() =>
        Promise.resolve([
          {
            name: 'test',
            ownerLogin: 'test',
          },
        ]),
      ),
      getAllRepositoryBranches: jest.fn().mockImplementation(() =>
        Promise.resolve({
          repoName: 'test',
          branches: [
            {
              name: 'master',
              lastCommit: 'test',
            },
          ],
        }),
      ),
    };
  }
}
