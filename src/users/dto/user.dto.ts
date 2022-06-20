import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    public constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
    }
}