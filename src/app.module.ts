import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { ProjectTaskService } from './project-task/project-task.service';
import { ProjectTaskModule } from './project-task/project-task.module';

import { PrismaModule } from './prisma.module';

@Module({
  imports: [AuthModule, TaskModule, ProjectModule, ProjectTaskModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}     