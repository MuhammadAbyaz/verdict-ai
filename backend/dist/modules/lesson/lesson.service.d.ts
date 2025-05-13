import { CreateLessonDto } from './lesson.dtos/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
export declare class LessonService {
    private readonly lessonRepository;
    constructor(lessonRepository: Repository<Lesson>);
    create(createLessonDto: CreateLessonDto): Promise<{
        lesson: Lesson;
    }>;
    getAll(): Promise<{
        lessons: Lesson[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: number): string;
    remove(id: number): string;
}
