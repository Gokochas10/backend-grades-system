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
          nota: true,
          observacion: true,
          tareas: {
            select: {
              nombre: true,
            }
          }

        }
      }
    );

    const estudents = await this.prismaService.usuarios.findMany({
      where : {
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
    }  }

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
