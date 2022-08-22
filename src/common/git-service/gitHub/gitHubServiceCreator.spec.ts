import { InternalServerErrorException } from '@nestjs/common';
import { GitHubServiceApi } from './gitHubServiceApi';
import { GitHubServiceCreator } from './gitHubServiceCreator';
// import { Octokit } from '@octokit/rest';

describe('GitHubServiceCreator', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should throw error if GITHUB_AUTH_KEY is not set', () => {
    const creator = new GitHubServiceCreator();
    process.env.GITHUB_AUTH_KEY = null;

    try {
      creator.getGitRepositoryApi();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
      expect(error.message).toBe('GITHUB_AUTH_KEY is not set');
    }
  });

  it('should create GitHubServiceApi', () => {
    process.env = { ...OLD_ENV, GITHUB_AUTH_KEY: 'test123' };
    const creator = new GitHubServiceCreator();
    expect(creator.getGitRepositoryApi()).toBeInstanceOf(GitHubServiceApi);
  });
});
