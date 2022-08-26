import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RepositoryViewerService } from './repository-viewer.service';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SupportedGitServices } from '../common/types';
import { RepositoriesWithBranches } from '../common/dto/RepositoriesWithBranches.entity';
import { ErrorResponse } from '../common/dto/ErrorResponse.entity';
import { AcceptHeaderGuard } from '../common/guards/AcceptHeaderGuard';

@ApiTags('repos')
@UseGuards(AcceptHeaderGuard)
@Controller('repos')
export class RepositoryViewerController {
  constructor(private service: RepositoryViewerService) {}

  @Get(':username')
  @ApiOkResponse({
    status: 200,
    description: 'User repository was successfully fetched',
    type: [RepositoriesWithBranches],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 406,
    description: 'Incorrect Accept header',
    type: ErrorResponse,
  })
  async getRepositories(
    @Param('username') username: string,
  ): Promise<RepositoriesWithBranches[]> {
    return await this.service
      .useGitService(SupportedGitServices.gitHub)
      .getRepositories(username);
  }
}
