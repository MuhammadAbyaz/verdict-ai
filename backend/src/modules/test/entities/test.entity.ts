import { Course } from '../../course/entities/course.entity';
import { Question } from '../../question/entities/question.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Course, (course) => course.test)
  course: Course;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];
}
