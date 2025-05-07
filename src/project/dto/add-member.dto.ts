import { IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  projectId: string;

  @IsString()
  username: string;
}