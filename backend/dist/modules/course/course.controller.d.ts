import { CourseService } from './course.service';
import { Response } from 'express';
import { CreateCourseDto } from './course.dtos';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    create(res: Response, courseDto: CreateCourseDto, thumbnail: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    getCourse(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
