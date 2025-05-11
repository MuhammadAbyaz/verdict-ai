import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}
  //   async create(createLessonDto: CreateLessonDto) {
  //     const { title, content, moduleId, order } = createLessonDto;
  //     const newLesson = this.lessonRepository.create({
  //       title,
  //       content,
  //       module: { id: moduleId },
  //       order,
  //     });
  //     await this.lessonRepository.save(newLesson);

  //     return {
  //       lesson: newLesson,
  //     };
  //   }

  //   async getAll() {
  //     const response = await this.lessonRepository.find();
  //     return {
  //       lessons: response,
  //       meta: {
  //         total: response.length,
  //       },
  //     };
  //   }

  async findOne({ id }: { id: string }) {
    const response = await this.testRepository.findOne({
      where: { id },
      relations: {
        questions: {
          options: true,
          correctOption: true,
        },
      },
    });
    if (!response) throw new NotFoundException();
    return { ...response };
  }

  // update(id: number, updateLessonDto: UpdateLessonDto) {
  //   return `This action updates a #${id} lesson`;
  // }
}
