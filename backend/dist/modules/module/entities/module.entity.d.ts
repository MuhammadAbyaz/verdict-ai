import { Lesson } from '../../lesson/entities/lesson.entity';
import { Course } from '../../course/entities/course.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
export declare class Module {
    id: string;
    title: string;
    description: string;
    order: number;
    xp: number;
    course: Course;
    lessons: Lesson[];
    quizes: Quiz[];
}
