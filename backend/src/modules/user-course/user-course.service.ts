// src/modules/user-course/user-course.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
  ) {}
  async getUserProgress({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: string;
  }) {
    let userCourse = await this.userCourseRepository.findOne({
      where: { userId, courseId },
    });

    if (!userCourse) {
      userCourse = this.userCourseRepository.create({ userId, courseId });
      await this.userCourseRepository.save(userCourse);
    }

    return { userProgress: userCourse }; // Return the found or newly created record
  }
}
