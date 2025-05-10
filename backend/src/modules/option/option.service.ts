import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './option.dtos/create-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    const { questionId, text } = createOptionDto;
    const newOption = this.optionRepository.create({
      text,
      question: { id: questionId },
    });
    const response = await this.optionRepository.save(newOption);
    return {
      option: response,
    };
  }

  async getAll() {
    const response = await this.optionRepository.find();
    return {
      options: response,
      meta: {
        total: response.length,
      },
    };
  }

  // async findOne(id: number) {
  //   const option = await this.optionRepository.findOne({ where: { id } });
  //   if (!option) {
  //     throw new NotFoundException(`Option with id ${id} not found`);
  //   }
  //   return option;
  // }

  // async update(id: number, updateOptionDto: UpdateOptionDto) {
  //   await this.optionRepository.update(id, updateOptionDto);
  //   const updatedOption = await this.optionRepository.findOne({
  //     where: { id },
  //   });
  //   if (!updatedOption) {
  //     throw new NotFoundException(`Option with id ${id} not found`);
  //   }
  //   return updatedOption;
  // }

  // async remove(id: number) {
  //   const option = await this.optionRepository.findOne({ where: { id } });
  //   if (!option) {
  //     throw new NotFoundException(`Option with id ${id} not found`);
  //   }
  //   await this.optionRepository.remove(option);
  //   return { message: `Option with id ${id} removed successfully` };
  // }
}
