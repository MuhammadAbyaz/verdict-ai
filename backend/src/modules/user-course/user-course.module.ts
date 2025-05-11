import { Module } from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { UserCourseController } from './user-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserCourse } from './entities/user-course.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCourse]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [UserCourseController],
  providers: [UserCourseService],
})
export class UserCourseModule {}
