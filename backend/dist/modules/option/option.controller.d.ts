import { OptionService } from './option.service';
import { CreateOptionDto } from './option.dtos/create-option.dto';
import { Response } from 'express';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
