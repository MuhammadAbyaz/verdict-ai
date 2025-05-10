import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './option.dtos/create-option.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport'; // Optional: Use if you have authentication

@Controller('options') // Changed to plural for consistency
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto, @Res() res: Response) {
    const response = await this.optionService.create(createOptionDto);
    return res.status(201).json(response);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res: Response) {
    const response = await this.optionService.getAll();
    return res.status(200).json(response);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string, @Res() res: Response) {
  //   const response = await this.optionService.findOne(+id);
  //   return res.status(200).json(response);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateOptionDto: UpdateOptionDto,
  //   @Res() res: Response,
  // ) {
  //   const response = await this.optionService.update(+id, updateOptionDto);
  //   return res.status(200).json(response);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string, @Res() res: Response) {
  //   const response = await this.optionService.remove(+id);
  //   return res.status(200).json(response);
  // }
}
