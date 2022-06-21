import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
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
    await user.save();
    return new UserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.findAll<User>();
    return users.map(u => new UserDto(u));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findByPk<User>(id);
    return user ? new UserDto(user) : null;
  }

  async getUserByEmail(email: string, password?: string): Promise<UserDto> {
    const user: User = await this.usersRepository.findOne<User>({
      where: { email, password },
    });
    return user ? new UserDto(user) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user)
      return null;
    user.set(updateUserDto);
    await user.save();

    return new UserDto(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user)
      return null;
    await user.destroy();
    return new UserDto(user);
  }
}
