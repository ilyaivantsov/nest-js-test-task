import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { JwtStrategy } from './auth/jwt-strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    DbModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY as string,
        signOptions: { expiresIn: '2m' },
      }),
    }),],
  controllers: [UsersController, AuthController],
  providers: [
    JwtStrategy,
    {
      provide: 'JWT_SECRET_KEY',
      useValue: process.env.JWT_SECRET_KEY as string,
    },
    UsersService,
    ...usersProviders,
    AuthService,],
  exports: [UsersService]
})
export class UsersModule { }
