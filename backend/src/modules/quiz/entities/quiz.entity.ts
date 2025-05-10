import { Module } from '../../module/entities/module.entity';
import { Question } from '../../question/entities/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quizes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  order: number;

  @ManyToOne(() => Module, (module) => module.quizes, {
    onDelete: 'CASCADE',
  })
  module: Module;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: true,
  })
  questions: Question[];
}
