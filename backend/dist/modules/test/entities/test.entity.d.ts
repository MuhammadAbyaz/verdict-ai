import { Course } from '../../course/entities/course.entity';
import { Question } from '../../question/entities/question.entity';
export declare class Test {
    id: string;
    course: Course;
    questions: Question[];
}
