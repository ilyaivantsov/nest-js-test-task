import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('email')
    async login(@Body() dto: LoginDto) {
        const credential = await this.authService.loginByEmail(dto);
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