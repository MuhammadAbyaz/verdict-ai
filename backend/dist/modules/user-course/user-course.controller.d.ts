import { UserCourseService } from './user-course.service';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
import { UpdateProgressDto, UpdateTestProgressDto } from './user-course.dtos';
export declare class UserCourseController {
    private readonly userCourseService;
    constructor(userCourseService: UserCourseService);
    getLeaderBoard(limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserProgress(id: string, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserXp(user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProgress(updateProgress: UpdateProgressDto, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    updateTestProgress(updateTestProgressDto: UpdateTestProgressDto, user: User, res: Response): Promise<Response<any, Record<string, any>>>;
    updateHearts(res: Response, updateHearts: {
        hearts: number;
    }, user: User): Promise<Response<any, Record<string, any>>>;
}
