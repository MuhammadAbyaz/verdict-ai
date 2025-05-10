import { PickType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto extends PickType(AuthDto, ['email', 'password']) {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
