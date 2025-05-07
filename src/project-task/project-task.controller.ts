import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { ProjectTaskService } from './project-task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Controller('project-tasks')
export class ProjectTaskController {
  constructor(private readonly service: ProjectTaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.service.createTask(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.updateTask(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body('userId') userId: string) {
    return this.service.deleteTask(id, userId);
  }

  @Get('project/:projectId')
  getTasks(@Param('projectId') projectId: string) {
    return this.service.findByProject(projectId);
  }
}
