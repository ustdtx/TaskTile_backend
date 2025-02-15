import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        deadline: createTaskDto.deadline ? new Date(createTaskDto.deadline) : null,
        status: createTaskDto.status || 'ONGOING',
        userId: createTaskDto.userId || null, // Assign to a user if provided
      },
    });
  
    return { message: 'Task added successfully', taskId: task.id };
  }

  async editTask(id: string, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
  
    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }
  
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        name: updateTaskDto.name ?? existingTask.name,
        description: updateTaskDto.description ?? existingTask.description,
        deadline: updateTaskDto.deadline ? new Date(updateTaskDto.deadline) : existingTask.deadline,
        status: updateTaskDto.status ?? existingTask.status,
      },
    });
  
    return { message: 'Task updated successfully', task: updatedTask };
  }
  async deleteTask(id: string) {
    const existingTask = await this.prisma.task.findUnique({ where: { id } });
  
    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }
  
    await this.prisma.task.delete({ where: { id } });
  
    return { message: 'Task deleted successfully' };
  }
  
}
