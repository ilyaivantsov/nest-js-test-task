import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { LoginDto } from './dto/login.dto';
import { IUserPayload } from './user-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) { }

    async login(dto: LoginDto): Promise<{ jwt: string }> {
        const user = dto.email ?
            await this.userService.getUserByEmail(dto.email, dto.password)
            :
            await this.userService.getUserByPhone(dto.phone, dto.password);
        if (!user)
            return null;
        return { jwt: this.generateToken({ id: user.id }) };
    }

    private generateToken(data: IUserPayload, options?: JwtSignOptions): string {
        return this.jwtService.sign(data, options);
    }
}
