import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    /**
     * Получить токен можно с помощью `email` или `phone`
     * 
     * > JWT-токен действует 2 минуты
     */
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const credential = await this.authService.login(dto);
        if (!credential)
            throw new BadRequestException('Invalid credentials');
        return credential;
    }

    /**
     * Проверка токена
     */
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get('whoami')
    whoami(@User() user) {
        return user;
    }
}
