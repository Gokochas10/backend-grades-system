import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ResourcesService {

  constructor(private prismaService: PrismaService) { }

  create(createResourceDto: CreateResourceDto) {
    return 'This action adds a new resource';
  }

  async findAllBySignature(id:string) {
    return await this.prismaService.recursos.findMany({
      where: {
        materia_id: parseInt(id)
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
