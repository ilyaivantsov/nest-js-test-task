import {
    IsString,
    IsEmail,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly name: string;
}