import { IsEnum } from 'class-validator';
import { COURSE_LEVEL } from '../../../constants/course-levels';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Module } from '../../module/entities/module.entity';
import { UserCourse } from '../../user-course/entities/user-course.entity';
import { Test } from '../../test/entities/test.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @IsEnum(COURSE_LEVEL)
  @Column({
    enum: COURSE_LEVEL,
  })
  level: COURSE_LEVEL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Module, (module) => module.course, {
    cascade: true,
  })
  modules: Module[];

  @OneToMany(() => UserCourse, (uc) => uc.course)
  userCourses: UserCourse[];

  @OneToOne(() => Test, {
    cascade: true,
    eager: true,
  })
  @JoinColumn() // owns the relationship, holds the foreign key
  test: Test;
}
