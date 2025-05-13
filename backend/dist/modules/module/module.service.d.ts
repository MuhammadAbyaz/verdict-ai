import { CreateModuleDto } from './module.dtos';
import { Module } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Test } from '../test/entities/test.entity';
export declare class ModuleService {
    private readonly moduleRepository;
    private readonly testRepository;
    constructor(moduleRepository: Repository<Module>, testRepository: Repository<Test>);
    create(createModuleDto: CreateModuleDto): Promise<{
        module: Module;
    }>;
    getAll(): Promise<{
        modules: Module[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    remove(id: number): string;
}
