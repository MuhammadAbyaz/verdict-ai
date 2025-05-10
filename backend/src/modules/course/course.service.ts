import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCourseDto } from './course.dtos';
import { STORAGE_SERVICE } from '../storage/storage.constanst';
import { StorageInterface } from '../storage/storage.interface';

@Injectable()
export class CourseService {
  PREFIX = 'courses';
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @Inject(STORAGE_SERVICE)
    private readonly storageService: StorageInterface,
    private readonly dataSource: DataSource, // Inject the DataSource
  ) {}

  async getAll() {
    const response = await this.courseRepository.find();
    return {
      courses: response,
      meta: {
        total: response.length,
      },
    };
  }
  async create(courseDto: CreateCourseDto, thumbnail: Express.Multer.File) {
    const { title, description, level } = courseDto;
    return await this.dataSource.transaction(async (manager) => {
      const newCourse = manager.create(Course, {
        title,
        level,
        description,
      });

      await manager.save(newCourse);

      const thumbnailUrl = await this.storageService.uploadFile(
        thumbnail,
        this.PREFIX,
        newCourse.id,
      );

      newCourse.thumbnail = thumbnailUrl;

      await manager.save(newCourse);

      delete newCourse.id;
      return {
        course: { ...newCourse },
      };
    });
  }
}
