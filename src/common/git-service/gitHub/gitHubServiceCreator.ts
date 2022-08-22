import { Octokit } from '@octokit/rest';
import { InternalServerErrorException } from '@nestjs/common';
import { GitServiceApi } from '../../types';
import { GitHubServiceApi } from './gitHubServiceApi';
import { GitServiceCreator } from '../gitServiceCreator';

/**
 * Provides factory method to create GitHubServiceApi instances.
 */
export class GitHubServiceCreator extends GitServiceCreator {
  constructor() {
    super();
  }

  getGitRepositoryApi(): GitServiceApi {
    const authKey = process.env.GITHUB_AUTH_KEY;
    if (!authKey) {
      throw new InternalServerErrorException('GITHUB_AUTH_KEY is not set');
    }
    const client = new Octokit({
      auth: authKey,
    });
    return new GitHubServiceApi(client);
  }
}
