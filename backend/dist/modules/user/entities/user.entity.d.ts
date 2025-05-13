import { UserCourse } from '../../user-course/entities/user-course.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    hearts: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userCourses: UserCourse[];
}
