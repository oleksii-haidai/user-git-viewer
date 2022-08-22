import { ApiProperty } from '@nestjs/swagger';
import { Branch } from './Branch.entity';

export class RepositoriesWithBranches {
  @ApiProperty({
    description: 'Name of the repository',
  })
  name: string;

  @ApiProperty({
    description: 'Owner of the repository',
  })
  ownerLogin: string;

  @ApiProperty({
    description: 'Branches of the repository',
  })
  branches: Branch[];
}
