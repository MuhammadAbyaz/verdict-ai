import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE } from '../storage/storage.constanst';
import { StorageInterface } from '../storage/storage.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  PREFIX = 'users';
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(STORAGE_SERVICE)
    private readonly storageService: StorageInterface,
  ) {}

  async updateProfilePicture({
    userId,
    profileImage,
  }: {
    userId: string;
    profileImage: Express.Multer.File;
  }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const profileImageUrl = await this.storageService.uploadFile(
      profileImage,
      this.PREFIX,
      userId,
    );
    user.image = profileImageUrl;
    await this.userRepository.save(user);
    return {
      user,
    };
  }
}
