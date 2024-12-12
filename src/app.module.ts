import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MateriaModule } from './materia/materia.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MateriaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
