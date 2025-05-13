import { Quiz } from '../../quiz/entities/quiz.entity';
import { Option } from '../../option/entities/option.entity';
import { Test } from '../../test/entities/test.entity';
export declare class Question {
    id: string;
    question: string;
    order: number;
    quiz: Quiz;
    test: Test;
    correctOption: Option;
    options: Option[];
}
