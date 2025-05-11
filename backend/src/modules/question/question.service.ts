import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './question.dtos/create-question.dto';
import { UpdateQuestionDto } from './question.dtos/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { correctOption, optionIds, order, question, quizId, testId } =
      createQuestionDto;
    const newQuestion = this.questionRepository.create({
      correctOption: { id: correctOption },
      order,
      question,
      quiz: { id: quizId },
      test: { id: testId },
      options: optionIds.map((id) => ({ id })),
    });
    const response = await this.questionRepository.save(newQuestion);
    return {
      question: response,
    };
  }

  async getAll() {
    const response = await this.questionRepository.find(); // Fetch all questions
    return {
      questions: response,
      meta: {
        total: response.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
