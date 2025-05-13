import { CreateQuizDto } from './quiz.dtos/create-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
export declare class QuizService {
    private readonly quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    create(createQuizDto: CreateQuizDto): Promise<{
        quiz: Quiz;
    }>;
    getAll(): Promise<{
        quizes: Quiz[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: number): string;
    remove(id: number): string;
}
