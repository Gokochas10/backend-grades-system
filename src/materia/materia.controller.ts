import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}



  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.materiaService.findAllByUid(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiaService.findOne(+id);
  }

  @Get(':id/estudiantes')
  findByMateria(@Param('id') id: string) {
    return this.materiaService.findByMateria(+id);
  }
}
