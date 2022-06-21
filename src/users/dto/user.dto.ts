import { User } from '../entities/user.entity';

export class UserDto {
    /**
     * Суррогатный ключ
     */
    readonly id: string;

    readonly email: string;

    readonly name: string;

    readonly phone: string;

    public constructor(user: User) {
        this.id = user.id;
        this.phone = user.phone;
        this.email = user.email;
        this.name = user.name;
    }
}