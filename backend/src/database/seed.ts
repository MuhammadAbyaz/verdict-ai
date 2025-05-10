// src/seeder/seed.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'src/database/config';
import { COURSE_LEVEL } from 'src/constants/course-levels';
import { Course } from 'src/modules/course/entities/course.entity';
import { Module } from 'src/modules/module/entities/module.entity';
import { Lesson } from 'src/modules/lesson/entities/lesson.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { Question } from 'src/modules/question/entities/question.entity';
import { Option } from 'src/modules/option/entities/option.entity';
import { Test } from 'src/modules/test/entities/test.entity';
import * as fs from 'fs';

const seed = async () => {
  const dataSource = new DataSource(dataSourceOptions as any);
  await dataSource.initialize();

  const courseRepo = dataSource.getRepository(Course);
  const moduleRepo = dataSource.getRepository(Module);
  const lessonRepo = dataSource.getRepository(Lesson);
  const quizRepo = dataSource.getRepository(Quiz);
  const questionRepo = dataSource.getRepository(Question);
  const optionRepo = dataSource.getRepository(Option);
  const testRepo = dataSource.getRepository(Test);

  // Read and parse the content.json file
  const content = JSON.parse(
    fs.readFileSync('src/database/content.json', 'utf-8'),
  );

  for (const courseData of content) {
    const course = courseRepo.create({
      title: courseData.title,
      description: courseData.description,
      level: courseData.level,
    });
    await courseRepo.save(course);

    for (const moduleData of courseData.modules) {
      const module = moduleRepo.create({
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
        xp: moduleData.xp,
        course: { id: course.id },
      });
      await moduleRepo.save(module);

      for (const timelineItem of moduleData.timeline) {
        if (timelineItem.type === 'lesson') {
          const lesson = lessonRepo.create({
            title: timelineItem.title,
            content: timelineItem.content,
            order: timelineItem.order,
            module: { id: module.id },
          });
          await lessonRepo.save(lesson);
        } else if (timelineItem.type === 'quiz') {
          const quiz = quizRepo.create({
            order: timelineItem.order,
            module: { id: module.id },
            questions: [],
          });
          await quizRepo.save(quiz);

          for (const questionData of timelineItem.questions) {
            const question = questionRepo.create({
              question: questionData.question,
              order: questionData.order,
              quiz: { id: quiz.id },
              test: { id: null }, // Assuming no test is associated here
              correctOption: null, // Set later
              options: [],
            });
            await questionRepo.save(question);

            const options = await optionRepo.save(
              questionData.options.map((text, index) =>
                optionRepo.create({ text, question }),
              ),
            );

            question.correctOption = options[questionData.correctIndex]; // Set the correct option
            question.options = options; // Set the options
            await questionRepo.save(question);

            quiz.questions.push(question); // Add question to quiz
          }
          await quizRepo.save(quiz);
        }
      }
    }
  }

  console.log('Seeding complete ✅');

  await dataSource.destroy();
};

seed().catch((err) => {
  console.error('Seeding failed ❌', err);
});
