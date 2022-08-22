import { Octokit } from '@octokit/rest';
import { GitHubServiceApi } from './gitHubServiceApi';

describe('GitHubServiceApi', () => {
  let client: Octokit;
  let api: GitHubServiceApi;

  beforeEach(() => {
    jest.resetModules();
    client = getClient();
    api = new GitHubServiceApi(client);
    Reflect.set(api, 'defaultResultSetLimit', 2);
  });

  it('should return all user repositories', async () => {
    const result = await api.getAllUserRepositories('test', false);
    expect(result).toHaveLength(2);
  });

  it('should return all repository branches', async () => {
    const result = await api.getAllRepositoryBranches('test', 'test');
    expect(result.branches).toHaveLength(3);
    expect(result.repoName).toBe('test');
  });
});

function getClient() {
  return {
    repos: {
      listForUser: jest.fn().mockImplementation((params) => {
        const resolveData =
          params.page === 1
            ? [getUserReposSingleResponse(), getUserReposSingleResponse(true)]
            : [getUserReposSingleResponse()];
        return Promise.resolve({
          data: [...resolveData],
        });
      }),
      listBranches: jest.fn().mockImplementation((params) => {
        const resolveData =
          params.page === 1
            ? [getRepoBranchesSingleResponse(), getRepoBranchesSingleResponse()]
            : [getRepoBranchesSingleResponse()];
        return Promise.resolve({
          data: [...resolveData],
        });
      }),
    },
  } as unknown as Octokit;
}

function getUserReposSingleResponse(includeForks = false) {
  return {
    name: 'test',
    owner: {
      login: 'test',
    },
    fork: includeForks,
  };
}

function getRepoBranchesSingleResponse() {
  return {
    name: 'master',
    commit: {
      sha: 'test123',
    },
  };
}
