import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  
    /**
     * @example "test@example.com"
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Пароль
     * @example "password"
     */
    @IsNotEmpty()
    password: string;
}