import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MateriaService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
 

  async findAllByUid(uid: string) {
    return await this.prismaService.materia_estudiantes.findMany({
      where: {
        estudiante_uid: uid
      },
      select: {
        materia_id: true,
        materias: {
          select: {
            nombre: true
            
          }
        }
      }
      
      
    });
  }

  async findOne(id: number) {
    return await this.prismaService.materias.findUnique({
      where: { id: id }
      });
  }
  
  async findByMateria(id: number) {
    return await this.prismaService.materia_estudiantes.findMany(
    )   
  }
}
