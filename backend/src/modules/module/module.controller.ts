import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './module.dtos';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto, @Res() res: Response) {
    const response = await this.moduleService.create(createModuleDto);
    return res.status(201).json(response);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Res() res: Response) {
    const response = await this.moduleService.getAll();
    return res.status(200).json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
  //   return this.moduleService.update(+id, updateModuleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.moduleService.remove(+id);
  // }
}
