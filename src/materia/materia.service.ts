import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MateriaService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
 

  async findAllByUid(uid: string) {
    return await this.prismaService.materias.findMany(
      {
        where: {
          profesor_uid: uid
        }
      }
    );
  }

  async findOne(id: number) {
    return await this.prismaService.materias.findUnique({
      where: { id: id }
      });
  }
  
  async findByMateria(id: number) {
    return await this.prismaService.materia_estudiantes.findMany({
      where: { materia_id: id },
      // include: {
      //   usuarios: {
      //     include: {
      //       tarea_estudiantes: {
      //         where: { tareas: { materia_id: id } },
      //         select: {
      //           nota: true
      //         }
      //       }
      //     }
      //   }
      // }
    })/*.then(estudiantes => {
      return estudiantes.map(estudiante => {
        const notas = estudiante.usuarios.tarea_estudiantes.map(te => te.nota);
        const promedio = notas.reduce((acc, nota) => acc + (nota?.toNumber() || 0), 0) / notas.length;
        return {
          ...estudiante,
          promedio
        };
      });
    });*/
  }
}
