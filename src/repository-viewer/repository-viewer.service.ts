import { Injectable, NotFoundException } from '@nestjs/common';
import { GitServiceCreator } from '../common/git-service/gitServiceCreator';
import { GitServiceFactory } from '../common/git-service/gitServiceFactory';
import { SupportedGitServices } from '../common/types';

@Injectable()
export class RepositoryViewerService {
  private _gitRepositoryApi: GitServiceCreator = undefined;

  constructor(private gitServiceFactory: GitServiceFactory) {}

  get gitRepositoryApi() {
    if (!this._gitRepositoryApi) {
      // Use github service as default
      this.useGitService(SupportedGitServices.gitHub);
    }
    return this._gitRepositoryApi;
  }

  useGitService(serviceKey: SupportedGitServices) {
    this._gitRepositoryApi = this.gitServiceFactory.create(serviceKey);
    return this;
  }

  async getRepositories(username: string) {
    try {
      return await this.gitRepositoryApi.getUserRepositoriesWithBranches(
        username,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException({ status: 404, Message: 'User not found' });
      }
      throw error;
    }
  }
}
