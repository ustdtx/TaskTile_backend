import { Module } from '@nestjs/common';
import { ProjectTaskController } from './project-task.controller';
import { PrismaService } from '../prisma.service';
import { ProjectTaskService } from './project-task.service';
@Module({
  controllers: [ProjectTaskController],
  providers: [PrismaService,ProjectTaskService]})
export class ProjectTaskModule {}
