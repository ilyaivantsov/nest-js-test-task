import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule { }
