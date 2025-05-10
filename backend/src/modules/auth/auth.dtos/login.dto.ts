import { PickType } from '@nestjs/swagger/dist';
import { AuthDto } from './auth.dto';

export class LoginDto extends PickType(AuthDto, ['email', 'password']) {}
