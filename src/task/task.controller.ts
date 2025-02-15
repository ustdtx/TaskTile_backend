import { Controller, Post, Body, Patch, Param , Delete} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  editTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.editTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string,) {
    return this.taskService.deleteTask(id);
  }
 }
