import { Module } from '../../module/entities/module.entity';
export declare class Lesson {
    id: string;
    title: string;
    content: string;
    order: number;
    videoUrl: string;
    module: Module;
}
