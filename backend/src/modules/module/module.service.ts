import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './module.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from './entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}
  async create(createModuleDto: CreateModuleDto) {
    const { title, description, order, xp, courseId } = createModuleDto;
    const newModule = this.moduleRepository.create({
      title,
      description,
      order,
      xp,
      course: { id: courseId },
    });
    await this.moduleRepository.save(newModule);
    return {
      module: newModule,
    };
  }

  async getAll() {
    const response = await this.moduleRepository.find();
    return {
      modules: response,
      meta: {
        total: response.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  // update(id: number, updateModuleDto: UpdateModuleDto) {
  //   return `This action updates a #${id} module`;
  // }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
