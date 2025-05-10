import { Question } from '../../question/entities/question.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];
}
