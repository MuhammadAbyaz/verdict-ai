import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../database/config';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../course/course.module';
import { ModuleModule } from '../module/module.module';
import { LessonModule } from '../lesson/lesson.module';
import { QuizModule } from '../quiz/quiz.module';
import { QuestionModule } from '../question/question.module';
import { OptionModule } from '../option/option.module';
import { UserCourseModule } from '../user-course/user-course.module';
import { TestModule } from '../test/test.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    CourseModule,
    ModuleModule,
    LessonModule,
    QuizModule,
    QuestionModule,
    OptionModule,
    UserCourseModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
