import { IsEnum } from 'class-validator';
import { COURSE_LEVEL } from '../../../constants/course-levels';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
