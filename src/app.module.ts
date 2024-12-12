import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaModule } from './materia/materia.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [MateriaModule, UsersModule, TasksModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
