import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });
    return { message: 'Task added successfully', taskId: task.id };
  }

  async editTask(id: string, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }

    await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return { message: 'Task updated successfully' };
  }
}
