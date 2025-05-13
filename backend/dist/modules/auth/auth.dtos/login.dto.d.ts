import { AuthDto } from './auth.dto';
declare const LoginDto_base: import("@nestjs/common").Type<Pick<AuthDto, "password" | "email">>;
export declare class LoginDto extends LoginDto_base {
}
export {};
