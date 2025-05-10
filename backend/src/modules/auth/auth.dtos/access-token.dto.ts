import { IsNotEmpty } from 'class-validator';

export class AccessTokenDto {
  @IsNotEmpty()
  token: string;
}
