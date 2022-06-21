import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
