import { ModuleService } from './module.service';
import { CreateModuleDto } from './module.dtos';
import { Response } from 'express';
export declare class ModuleController {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    create(createModuleDto: CreateModuleDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<any>;
}
