// src/modules/user-course/user-course.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourse } from './entities/user-course.entity';
import { Repository } from 'typeorm';
import { Module } from '../module/entities/module.entity';
import { UpdateProgressDto, UpdateTestProgressDto } from './user-course.dtos';
import { TEST_PROGRESS } from 'src/constants/test-progress';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly userCourseRepository: Repository<UserCourse>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!userCourses || !user) throw new NotFoundException();

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

    return { totalXp, hearts: user.hearts };
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
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userCourse || !user) throw new NotFoundException();

    if (updateProgress.moduleOrder <= userCourse.moduleProgress) {
      return {
        userCourse,
      };
    }

    userCourse.moduleProgress = updateProgress.moduleOrder;
    user.hearts = updateProgress.hearts;
    await this.userCourseRepository.save(userCourse);
    await this.userRepository.save(user);
    return {
      userCourse,
    };
  }

  async updateTestProgress({
    userId,
    updateTestProgress,
  }: {
    userId: string;
    updateTestProgress: UpdateTestProgressDto;
  }) {
    const userCourse = await this.userCourseRepository.findOne({
      where: { userId, courseId: updateTestProgress.courseId },
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userCourse || !user) throw new NotFoundException();

    userCourse.testProgress = TEST_PROGRESS.PASS;
    userCourse.moduleProgress += 1;
    user.hearts = updateTestProgress.hearts;

    await this.userCourseRepository.save(userCourse);
    await this.userRepository.save(user);
    return {
      userCourse,
    };
  }

  async getLeaderBoard({ limit }: { limit: number }) {
    const response = await this.userRepository.find();
    const finalLeaderBoard: { xp: number; username: string }[] = [];
    for (const user of response) {
      const userXp = await this.getUserTotalXp({ userId: user.id });
      finalLeaderBoard.push({
        xp: userXp.totalXp,
        username: `${user.firstName} ${user.lastName}`,
      });
    }
    finalLeaderBoard.sort((a, b) => b.xp - a.xp);
    return {
      leaderboard: finalLeaderBoard.slice(0, limit),
    };
  }
}
