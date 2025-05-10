import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './quiz.dtos/create-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
  ) {}
  async create(createQuizDto: CreateQuizDto) {
    const { moduleId, questionIds, order } = createQuizDto;
    const newQuiz = this.quizRepository.create({
      module: { id: moduleId },
      questions: questionIds.map((id) => ({ id })),
      order,
    });

    await this.quizRepository.save(newQuiz);
    return {
      quiz: newQuiz,
    };
  }

  async getAll() {
    const response = await this.quizRepository.find();
    return {
      quizes: response,
      meta: {
        total: response.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  // update(id: number, updateQuizDto: UpdateQuizDto) {
  //   return `This action updates a #${id} quiz`;
  // }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
