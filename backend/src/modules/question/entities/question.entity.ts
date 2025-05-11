import { Quiz } from '../../quiz/entities/quiz.entity';
import { Option } from '../../option/entities/option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from '../../test/entities/test.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  question: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  quiz: Quiz;

  @ManyToOne(() => Test, (test) => test.questions, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  test: Test;

  @OneToOne(() => Option, { eager: true, cascade: true })
  @JoinColumn()
  correctOption: Option;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
