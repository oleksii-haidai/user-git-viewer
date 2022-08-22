import { Injectable } from '@nestjs/common';
import { SupportedGitServices } from '../types';
import { GitHubServiceCreator } from './gitHub/gitHubServiceCreator';
import { GitServiceCreator } from './gitServiceCreator';

/**
 * Factory class to create GitServiceCreator instances
 */
Injectable();
export class GitServiceFactory {
  create(serviceKey: SupportedGitServices): GitServiceCreator {
    switch (serviceKey) {
      case SupportedGitServices.gitHub:
        return new GitHubServiceCreator();
      default:
        throw new Error(`Unsupported service: ${serviceKey}`);
    }
  }
}
