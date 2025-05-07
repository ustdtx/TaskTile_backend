import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
