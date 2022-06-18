import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = User.build(createUserDto);
    return user.save();
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.findAll<User>();
    return users;
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findByPk<User>(id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
