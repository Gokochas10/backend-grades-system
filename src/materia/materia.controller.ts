import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}



  @Get(':id')
  async findAll(@Param('id') id: string) {
    return await this.materiaService.findAllByUid(id);
  }

  @Get(':id/one')
  findOne(@Param('id') id: string) {
    return this.materiaService.findOne(+id);
  }

  @Get(':id/estudiantes')
  findByMateria(@Param('id') id: number) {
    console.log(id);
    return this.materiaService.findByMateria(+id);
  }
}
