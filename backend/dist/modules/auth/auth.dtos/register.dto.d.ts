import { AuthDto } from './auth.dto';
declare const RegisterDto_base: import("@nestjs/common").Type<Pick<AuthDto, "password" | "email">>;
export declare class RegisterDto extends RegisterDto_base {
    firstName: string;
    lastName: string;
}
export {};
