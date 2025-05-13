import { StorageInterface } from '../storage/storage.interface';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private readonly storageService;
    PREFIX: string;
    constructor(userRepository: Repository<User>, storageService: StorageInterface);
    updateProfilePicture({ userId, profileImage, }: {
        userId: string;
        profileImage: Express.Multer.File;
    }): Promise<{
        user: User;
    }>;
}
