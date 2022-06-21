import {
    IsString,
    IsEmail,
    MinLength,
    IsPhoneNumber,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class CreateUserDto {
    /**
     * @example "test@example.com"
     */
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    /**
     * @example +79999999999
     */
    @IsOptional()
    @IsPhoneNumber('RU')
    @IsNotEmpty()
    readonly phone: string;

    /**
     * @example "password"
     */
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;

    /**
     * @example "Adam"
     */
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}