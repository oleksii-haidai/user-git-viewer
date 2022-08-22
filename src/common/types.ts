import { RepositoryBranch } from './dto/RepositoryBranch.entity';

export type UserRepository = {
  name: string;
  ownerLogin: string;
};

export interface GitServiceApi {
  getAllUserRepositories(
    username: string,
    includeForks: boolean,
  ): Promise<UserRepository[]>;
  getAllRepositoryBranches(
    ownerName: string,
    repoName: string,
  ): Promise<RepositoryBranch>;
}

export enum SupportedGitServices {
  gitHub = 'GitHub',
}
