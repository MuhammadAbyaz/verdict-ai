import { Course } from './entities/course.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCourseDto } from './course.dtos';
import { StorageInterface } from '../storage/storage.interface';
export declare class CourseService {
    private readonly courseRepository;
    private readonly storageService;
    private readonly dataSource;
    PREFIX: string;
    constructor(courseRepository: Repository<Course>, storageService: StorageInterface, dataSource: DataSource);
    getAll(): Promise<{
        courses: Course[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: string): Promise<Course>;
    create(courseDto: CreateCourseDto, thumbnail: Express.Multer.File): Promise<{
        course: {
            id: string;
            title: string;
            description: string;
            thumbnail: string;
            level: import("../../constants/course-levels").COURSE_LEVEL;
            createdAt: Date;
            updatedAt: Date;
            modules: import("../module/entities/module.entity").Module[];
            userCourses: import("../user-course/entities/user-course.entity").UserCourse[];
            test: import("../test/entities/test.entity").Test;
        };
    }>;
}
