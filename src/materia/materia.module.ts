import { Module } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [MateriaController],
  providers: [MateriaService, PrismaService],

})
export class MateriaModule {}
