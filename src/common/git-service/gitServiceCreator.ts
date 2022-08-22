import { GitServiceApi } from '../types';
import { RepositoriesWithBranches } from '../dto/RepositoriesWithBranches.entity';
import { RepositoryBranch } from '../dto/RepositoryBranch.entity';

/**
 * Creates a GitServiceApi instance for the given service.
 * Provides common logic for all services.
 */
export abstract class GitServiceCreator {
  abstract getGitRepositoryApi(): GitServiceApi;

  public async getUserRepositoriesWithBranches(
    username: string,
  ): Promise<RepositoriesWithBranches[]> {
    const userGitRepos =
      await this.getGitRepositoryApi().getAllUserRepositories(username, false);
    const promises: Promise<RepositoryBranch>[] = userGitRepos.map((userRepo) =>
      this.getGitRepositoryApi().getAllRepositoryBranches(
        userRepo.ownerLogin,
        userRepo.name,
      ),
    );

    const userReposWithBranches = await Promise.all(promises);

    return userGitRepos.map((userRepo) => {
      const branches = userReposWithBranches.find(
        (branches) => branches.repoName === userRepo.name,
      ).branches;
      return { ...userRepo, branches };
    });
  }
}
