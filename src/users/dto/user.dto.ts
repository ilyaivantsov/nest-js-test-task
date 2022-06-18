import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    constructor(user: User) {
        // this.id = user.id;
        this.email = user.email;
        this.name = user.name;
    }
}