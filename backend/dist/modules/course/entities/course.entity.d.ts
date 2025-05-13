import { COURSE_LEVEL } from '../../../constants/course-levels';
import { Module } from '../../module/entities/module.entity';
import { UserCourse } from '../../user-course/entities/user-course.entity';
import { Test } from '../../test/entities/test.entity';
export declare class Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    level: COURSE_LEVEL;
    createdAt: Date;
    updatedAt: Date;
    modules: Module[];
    userCourses: UserCourse[];
    test: Test;
}
