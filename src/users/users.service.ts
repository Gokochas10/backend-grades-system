import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const found = await this.prismaService.usuarios.findUnique({
      where: {
        uid: createUserDto.uid,
      },
    });

    if (found) {
      return found;
    } else {
      const user = await this.prismaService.usuarios.create({
        data: {
          uid: createUserDto.uid,
          rol: "ESTUDIANTE",
          correo: createUserDto.email,
        },
      });

      if (user) {
        return user;
      } else {
        return new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findByUid(id: string) {
    const found = this.prismaService.usuarios.findUnique({
      where: {
        uid: id,
      },
    });

    if (found) {
      return found;
    } else {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll () {
    const users = this.prismaService.usuarios.findMany();
    if (users) {
      return users;
    } else {
      return new HttpException('Users not found', HttpStatus.BAD_REQUEST);
    }
  }
  
  async deleteUser(uid: string) {
    const deleted = await this.prismaService.usuarios.delete({
      where: {
        uid: uid,
      },
    });

    if (deleted) {
      return deleted;
    } else {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
