import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prismaService: PrismaService) { }

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  async findAllByCourse(course_id: string) {
    const tasks = await this.prismaService.tarea_estudiantes.findMany(
      {
        where: {
          tareas: {
            materia_id: parseInt(course_id)
          }
        },
        select: {
          estudiante_uid: true,
          tarea_id: true,
          tareas: {
            select: {
              nombre: true,
            }
          }
        }
      }
    );

    const estudents = await this.prismaService.usuarios.findMany({
      where: {
        rol: "ESTUDIANTE"
      }
    });

    const mappedResult = tasks.map((task) => {
      const estudent = estudents.find((estudent) => estudent.uid === task.estudiante_uid);
      return {
        ...task,
        estudiante: estudent
      }
    });

    if (mappedResult) {
      return mappedResult;
    } else {
      return new HttpException('Tasks not found', HttpStatus.BAD_REQUEST);
    }
  }

  async findByStudent(uid: string) {
    const tasks = await this.prismaService.tarea_estudiantes.findMany(
      {
        where: {
          estudiante_uid: uid
        },
        select: {
          tarea_id: true,
          tareas: {
            select: {
              nombre: true,
            }
          }
        }
      }
    );

    if (tasks) {
      return tasks;
    } else {
      return new HttpException('Tasks not found', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByMateria(id: string, uid:string) {
    return await this.prismaService.tareas.findMany({
      where: {
        materia_id: parseInt(id)
      },
      select: {
        nombre: true,
        descripcion: true,
        tarea_estudiantes: {
          where: {
            estudiante_uid: uid
          },
          select: {
            estado: true,
          }
        }
      }
    })
  }


  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
