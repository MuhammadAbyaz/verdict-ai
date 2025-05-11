import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const response = await this.moduleRepository
      .createQueryBuilder('module')
      .leftJoin('module.course', 'course')
      .leftJoinAndSelect('module.lessons', 'lessons')
      .leftJoinAndSelect('module.quizes', 'quizes')
      .leftJoinAndSelect('quizes.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      .leftJoinAndSelect('questions.correctOption', 'correctOption')
      .addSelect(['course.id'])
      .where('module.id = :id', { id })
      .getOne();

    if (!response) throw new NotFoundException();
    return { ...response };
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
