import { ApiProperty } from '@nestjs/swagger';

export class Branch {
  @ApiProperty({
    description: 'Name of the branch',
  })
  name: string;

  @ApiProperty({
    description: 'Last commit sha of the branch',
  })
  lastCommit: string;
}
