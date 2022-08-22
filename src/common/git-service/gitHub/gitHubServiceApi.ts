import { Octokit } from '@octokit/rest';
import { GitServiceApi, UserRepository } from '../../types';
import { Branch } from '../../dto/Branch.entity';
import { RepositoryBranch } from '../../dto/RepositoryBranch.entity';

/**
 * Provides api methods for GitHub service.
 */
export class GitHubServiceApi implements GitServiceApi {
  private readonly defaultResultSetLimit = 100;

  constructor(private client: Octokit) {}

  /**
   * Gets all user repositories.
   * @param username
   * @param includeForks
   * @returns
   */
  async getAllUserRepositories(
    username: string,
    includeForks: boolean,
    perPageLimit = this.defaultResultSetLimit,
  ): Promise<UserRepository[]> {
    const userRepos: UserRepository[] = [];
    let page = 1;
    while (true) {
      const [pageLength, data] = await this.fetchUserRepos(
        username,
        page,
        perPageLimit,
        includeForks,
      );
      userRepos.push(...data);
      if (pageLength < perPageLimit) {
        break;
      }
      page++;
    }
    return userRepos;
  }

  /**
   * Gets all repository branches.
   * @param ownerName
   * @param repoName
   * @returns
   */
  async getAllRepositoryBranches(
    ownerName: string,
    repoName: string,
    perPageLimit = this.defaultResultSetLimit,
  ): Promise<RepositoryBranch> {
    const branches: Branch[] = [];
    let page = 1;
    while (true) {
      const data = await this.fetchRepoBranches(
        ownerName,
        repoName,
        page,
        perPageLimit,
      );
      branches.push(...data);
      if (data.length < perPageLimit) {
        break;
      }
      page++;
    }
    return { repoName, branches };
  }

  private async fetchUserRepos(
    username: string,
    page: number,
    limit: number,
    includeForks: boolean,
  ): Promise<[number, UserRepository[]]> {
    let { data } = await this.client.repos.listForUser({
      username,
      per_page: limit,
      page,
    });
    const perPage = data.length;

    if (!includeForks) {
      data = data.filter((repo) => !repo.fork);
    }

    return [
      perPage,
      data.map((repo) => ({
        name: repo.name,
        ownerLogin: repo.owner.login,
      })),
    ];
  }

  private async fetchRepoBranches(
    ownerName: string,
    repoName: string,
    page: number,
    limit: number,
  ): Promise<Branch[]> {
    const { data } = await this.client.repos.listBranches({
      owner: ownerName,
      repo: repoName,
      per_page: limit,
      page,
    });
    return data.map((branch) => ({
      name: branch.name,
      lastCommit: branch.commit.sha,
    }));
  }
}
