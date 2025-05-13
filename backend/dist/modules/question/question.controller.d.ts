import { QuestionService } from './question.service';
import { CreateQuestionDto } from './question.dtos/create-question.dto';
import { UpdateQuestionDto } from './question.dtos/update-question.dto';
import { Response } from 'express';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): string;
    update(id: string, updateQuestionDto: UpdateQuestionDto): string;
    remove(id: string): string;
}
