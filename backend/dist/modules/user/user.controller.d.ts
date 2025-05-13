import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateProfileImage(res: Response, user: User, profileImage: Express.Multer.File): Promise<void>;
}
