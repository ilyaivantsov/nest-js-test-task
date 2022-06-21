import { IsEmail, ValidateIf, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
    /**
       * @example "test@example.com"
       */
    @ValidateIf(o => o.phone == undefined || o.email)
    @IsEmail()
    @IsNotEmpty()
    readonly email?: string;

    /**
     * @example +79999999999
     */
    @ValidateIf(o => o.email == undefined || o.phone)
    @IsPhoneNumber('RU')
    @IsNotEmpty()
    readonly phone?: string;

    /**
     * @example "password"
     */
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}