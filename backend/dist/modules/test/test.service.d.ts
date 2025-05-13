import { Repository } from 'typeorm';
import { Test } from './entities/test.entity';
export declare class TestService {
    private readonly testRepository;
    constructor(testRepository: Repository<Test>);
    findOne({ id }: {
        id: string;
    }): Promise<{
        id: string;
        course: import("../course/entities/course.entity").Course;
        questions: import("../question/entities/question.entity").Question[];
    }>;
}
