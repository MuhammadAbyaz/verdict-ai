import { QuizService } from './quiz.service';
import { CreateQuizDto } from './quiz.dtos/create-quiz.dto';
import { Response } from 'express';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): string;
    remove(id: string): string;
}
