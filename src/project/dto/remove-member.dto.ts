import { IsString } from 'class-validator';
export class RemoveMemberDto {
    @IsString()
    projectId: string;

    @IsString()
    userId: string;
  }
  