import { TEST_PROGRESS } from '../../../constants/test-progress';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';
export declare class UserCourse {
    userId: string;
    courseId: string;
    user: User;
    course: Course;
    moduleProgress: number;
    testProgress: TEST_PROGRESS;
    enrolledAt: Date;
}
