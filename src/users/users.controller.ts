import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUserDto } from './dto/get-many-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number= 10,
  //   @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number = 0,
  //   @Query('name') name?: string,
  //   @Query('phone') phone?: string,
  //   @Query('email') email?: string
  // ) {
  //   return this.usersService.findAll(limit, offset, { name, phone, email });
  // }

  @Get()
  findAll(
    @Query() query: GetManyUserDto
  ) {
    const { limit, offset, ...search } = query;
    return this.usersService.findAll(limit, offset, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
