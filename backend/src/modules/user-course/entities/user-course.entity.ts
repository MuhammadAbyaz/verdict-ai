import { TEST_PROGRESS } from '../../../constants/test-progress';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsEnum } from 'class-validator';

@Entity('user-course')
export class UserCourse {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  courseId: string;

  @ManyToOne(() => User, (user) => user.userCourses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Course, (course) => course.userCourses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ default: 0 })
  moduleProgress: number;

  @IsEnum(TEST_PROGRESS)
  @Column({
    enum: TEST_PROGRESS,
    default: TEST_PROGRESS.UNATTEMPTED,
  })
  testProgress: TEST_PROGRESS;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}
