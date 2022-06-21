import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUserDto } from './dto/get-many-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './auth/user.decorator';

@ApiTags('UserCRUD')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Метод создает нового пользоателя
   */
  @Post('registration')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
      .then(u => {
        if (!u)
          throw new BadRequestException(`${createUserDto.email} or ${createUserDto.phone} already exists`);
        return u;
      });
  }

  /**
   * Поиск с простой пагинацией
   */
  @Get('find')
  findAll(
    @Query() { limit, offset, ...search }: GetManyUserDto
  ) {
    return this.usersService.findAll(limit, offset, search);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Обновить данные `user` с помощью JWT-токена
   */
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@User('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id)
      .then(u => {
        if (!u)
          throw new BadRequestException();
        return u;
      });
  }
}
