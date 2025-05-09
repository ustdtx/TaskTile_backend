import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(dto: CreateProjectDto) {
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        members: {
          create: {
            userId: dto.ownerId,
            isManager: true,
          },
        },
      },
    });
    return project;
  }

  async addMember(dto: AddMemberDto) {
    const user = await this.prisma.user.findUnique({ where: { username: dto.username } });
    if (!user) throw new NotFoundException('User not found');
    
    return this.prisma.projectMember.create({
      data: {
        userId: user.id,
        projectId: dto.projectId,
        isManager: false,
      },
    });
  }

  async updateRole(dto: UpdateRoleDto) {
    return this.prisma.projectMember.updateMany({
      where: {
        projectId: dto.projectId,
        userId: dto.userId,
      },
      data: {
        isManager: dto.isManager,
      },
    });
  }

  async getMembers(projectId: string) {
    return this.prisma.projectMember.findMany({
      where: { projectId },
      include: { user: true },
    });
  }
async getProjectsForUser(userId: string) {
  return this.prisma.projectMember.findMany({
    where: { userId },
    include: {
      project: true,
    },
  });
}

async removeMember(dto: RemoveMemberDto) {
  return this.prisma.projectMember.deleteMany({
    where: {
      projectId: dto.projectId,
      userId: dto.userId,
    },
  });
}

async deleteProject(projectId: string, userId: string) {
  // Check if the user is a manager of the project
  const isManager = await this.prisma.projectMember.findFirst({
    where: {
      projectId,
      userId,
      isManager: true,
    },
  });

  if (!isManager) {
    throw new NotFoundException('Project not found or you do not have permission to delete it');
  }

  // First delete all related records
  await this.prisma.projectMember.deleteMany({
    where: { projectId },
  });

  // Then delete the project
  return this.prisma.project.delete({
    where: { id: projectId },
  });
}

async searchUsers(username: string) {
  return this.prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}
}