import { Response } from 'express';
import { TestService } from './test.service';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
