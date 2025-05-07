import { IsBoolean, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  projectId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  isManager: boolean;
}