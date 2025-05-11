import { Lesson } from '../../lesson/entities/lesson.entity';
import { Course } from '../../course/entities/course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  xp: number;

  @ManyToOne(() => Course, (course) => course.modules, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.module, {
    cascade: true,
  })
  lessons: Lesson[];

  @OneToMany(() => Quiz, (quiz) => quiz.module, {
    cascade: true,
  })
  quizes: Quiz[];
}
