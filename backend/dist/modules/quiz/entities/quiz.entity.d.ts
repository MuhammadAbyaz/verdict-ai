import { Module } from '../../module/entities/module.entity';
import { Question } from '../../question/entities/question.entity';
export declare class Quiz {
    id: string;
    title: string;
    order: number;
    module: Module;
    questions: Question[];
}
