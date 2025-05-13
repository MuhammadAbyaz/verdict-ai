import { CreateOptionDto } from './option.dtos/create-option.dto';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
export declare class OptionService {
    private readonly optionRepository;
    constructor(optionRepository: Repository<Option>);
    create(createOptionDto: CreateOptionDto): Promise<{
        option: Option;
    }>;
    getAll(): Promise<{
        options: Option[];
        meta: {
            total: number;
        };
    }>;
}
