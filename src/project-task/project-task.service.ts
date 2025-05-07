import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class ProjectTaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    const member = await this.prisma.projectMember.findFirst({
      where: { projectId: dto.projectId, userId: dto.creatorId },
    });
    if (!member?.isManager) throw new ForbiddenException('Only managers can create tasks');

    return this.prisma.projectTask.create({ data: dto });
  }

  async updateTask(taskId: string, dto: UpdateTaskDto) {
    const task = await this.prisma.projectTask.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    const member = await this.prisma.projectMember.findFirst({
      where: { projectId: task.projectId, userId: dto.editorId },
    });
    if (!member) throw new ForbiddenException('Not part of project');

    // If not manager, only allow deadline change
    if (!member.isManager) {
      return this.prisma.projectTask.update({
        where: { id: taskId },
        data: { deadline: dto.deadline },
      });
    }

    return this.prisma.projectTask.update({ where: { id: taskId }, data: dto });
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await this.prisma.projectTask.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found'); // Add null check here

    const member = await this.prisma.projectMember.findFirst({
      where: { projectId: task.projectId, userId },
    });
    if (!member?.isManager) throw new ForbiddenException('Only managers can delete tasks');

    return this.prisma.projectTask.delete({ where: { id: taskId } });
  }

  async findByProject(projectId: string) {
    return this.prisma.projectTask.findMany({ where: { projectId } });
  }
}
