import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MateriaService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
 

  async findAllByUid(uid: string) {
    const students =  await this.prismaService.materia_estudiantes.findMany({
      where: {
        estudiante_uid: uid
      },
      select: {
        materia_id: true,
        materias: {
          select: {
            nombre: true,
            tareas: {
              select: {
                tarea_estudiantes: {
                  where: {
                    estudiante_uid: uid
                  },
                  select: {
                    nota: true,
                  }
                }
              }
            }
            
          },
          
        },
      }
    });
    

    const avgGrade =  students.map((student) => {
      const tareas = student.materias.tareas.map((tarea) => {
        const notas = tarea.tarea_estudiantes.map((nota) => {
          return nota.nota;
        });
        const avg = notas.reduce((a, b) => a + b, 0) / notas.length;
        return avg;
      });
      return {
        materia: student.materias.nombre,
        materia_id: student.materia_id,
        promedio: tareas.reduce((a, b) => a + b, 0) / tareas.length,
      };
    });

  

    return avgGrade;
      
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
