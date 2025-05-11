// src/modules/user-course/user-course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Repository } from 'typeorm';
import { Module } from '../module/entities/module.entity';
import { UpdateProgressDto } from './user-course.dtos';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
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

    return { userProgress: { ...userCourse } };
  }
  async getUserTotalXp({ userId }: { userId: string }) {
    const userCourses = await this.userCourseRepository.find({
      where: { userId },
      relations: ['course'],
    });

    let totalXp = 0;

    for (const userCourse of userCourses) {
      const modules = await this.moduleRepository.find({
        where: { course: { id: userCourse.courseId } },
        order: { order: 'ASC' },
      });

      for (
        let i = 0;
        i < modules.length && i < userCourse.moduleProgress;
        i++
      ) {
        totalXp += modules[i].xp;
      }
    }

    return { totalXp };
  }

  async updateProgress({
    updateProgress,
    userId,
  }: {
    updateProgress: UpdateProgressDto;
    userId: string;
  }) {
    const userCourse = await this.userCourseRepository.findOne({
      where: { userId, courseId: updateProgress.courseId },
    });
    if (!userCourse) throw new NotFoundException();

    userCourse.moduleProgress = updateProgress.moduleOrder;
    await this.userCourseRepository.save(userCourse);
    return {
      userCourse,
    };
  }
}
