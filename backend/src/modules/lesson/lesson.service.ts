import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './lesson.dtos/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}
  async create(createLessonDto: CreateLessonDto) {
    const { title, content, moduleId, order } = createLessonDto;
    const newLesson = this.lessonRepository.create({
      title,
      content,
      module: { id: moduleId },
      order,
    });
    await this.lessonRepository.save(newLesson);

    return {
      lesson: newLesson,
    };
  }

  async getAll() {
    const response = await this.lessonRepository.find();
    return {
      lessons: response,
      meta: {
        total: response.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  // update(id: number, updateLessonDto: UpdateLessonDto) {
  //   return `This action updates a #${id} lesson`;
  // }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
