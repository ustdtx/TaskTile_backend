import { Controller, Post, Body, Patch, Get, Param,Query,Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma.service';  
import{ RemoveMemberDto } from './dto/remove-member.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.service.createProject(dto);
  }

  @Post('add-member')
  addMember(@Body() dto: AddMemberDto) {
    return this.service.addMember(dto);
  }

  @Patch('update-role')
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.service.updateRole(dto);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.service.getMembers(id);
  }
// projects.controller.ts

@Get('user/:userId')
async getProjectsByUser(@Param('userId') userId: string) {
  return this.service.getProjectsForUser(userId);
}

@Delete('remove-member')
removeMember(@Body() dto: RemoveMemberDto) {
  return this.service.removeMember(dto);
}

@Delete(':id')
deleteProject(@Param('id') id: string, @Body('userId') userId: string) {
  return this.service.deleteProject(id, userId);
}

@Get('search')
async searchUsers(
  @Query('username') username: string
) {
  return this.service.searchUsers(username);
}

}


 
