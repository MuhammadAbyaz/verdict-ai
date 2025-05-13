import { CreateQuestionDto } from './question.dtos/create-question.dto';
import { UpdateQuestionDto } from './question.dtos/update-question.dto';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
export declare class QuestionService {
    private readonly questionRepository;
    constructor(questionRepository: Repository<Question>);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        question: Question;
    }>;
    getAll(): Promise<{
        questions: Question[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: number): string;
    update(id: number, updateQuestionDto: UpdateQuestionDto): string;
    remove(id: number): string;
}
