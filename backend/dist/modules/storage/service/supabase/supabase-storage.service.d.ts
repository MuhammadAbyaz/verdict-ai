import { StorageInterface } from '../../storage.interface';
import { ConfigService } from '@nestjs/config';
export declare class SupabaseStorageService implements StorageInterface {
    private readonly configService;
    private readonly supabaseProvider;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, prefix: string, path: string): Promise<string>;
}
