import { UserCourse } from './entities/user-course.entity';
import { Repository } from 'typeorm';
import { Module } from '../module/entities/module.entity';
import { UpdateProgressDto, UpdateTestProgressDto } from './user-course.dtos';
import { TEST_PROGRESS } from 'src/constants/test-progress';
import { User } from '../user/entities/user.entity';
export declare class UserCourseService {
    private readonly userCourseRepository;
    private readonly moduleRepository;
    private readonly userRepository;
    constructor(userCourseRepository: Repository<UserCourse>, moduleRepository: Repository<Module>, userRepository: Repository<User>);
    getUserProgress({ userId, courseId, }: {
        userId: string;
        courseId: string;
    }): Promise<{
        userProgress: {
            userId: string;
            courseId: string;
            user: User;
            course: import("../course/entities/course.entity").Course;
            moduleProgress: number;
            testProgress: TEST_PROGRESS;
            enrolledAt: Date;
        };
    }>;
    getUserTotalXp({ userId }: {
        userId: string;
    }): Promise<{
        totalXp: number;
        hearts: number;
    }>;
    updateProgress({ updateProgress, userId, }: {
        updateProgress: UpdateProgressDto;
        userId: string;
    }): Promise<{
        userCourse: UserCourse;
    }>;
    updateTestProgress({ userId, updateTestProgress, }: {
        userId: string;
        updateTestProgress: UpdateTestProgressDto;
    }): Promise<{
        userCourse: UserCourse;
    }>;
    getLeaderBoard({ limit }: {
        limit: number;
    }): Promise<{
        leaderboard: {
            xp: number;
            username: string;
        }[];
    }>;
    updateHearts({ hearts, userId }: {
        hearts: number;
        userId: string;
    }): Promise<{
        user: User;
    }>;
}
