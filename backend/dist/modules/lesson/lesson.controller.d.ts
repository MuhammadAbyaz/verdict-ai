import { LessonService } from './lesson.service';
import { CreateLessonDto } from './lesson.dtos/create-lesson.dto';
import { Response } from 'express';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(createLessonDto: CreateLessonDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): string;
    remove(id: string): string;
}
