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

  findAllByCourse(course_id: number) {
    const tasks = this.prismaService.tarea_estudiantes.findMany(
      {
        where: {
          tareas: {
            materia_id: course_id
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
    if (tasks) {
      return tasks;
    } else {
      return new HttpException('Tasks not found', HttpStatus.BAD_REQUEST);
    }
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
