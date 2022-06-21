import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Op, ValidationError, WhereOptions } from 'sequelize';

export interface GetManyResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = User.build(createUserDto);
    return user.save().then(u => new UserDto(u)).catch((e: ValidationError) => {
      console.error(e.message);
      return null;
    });
  }

  async findAll(limit: number = 20, offset: number = 0, search: any): Promise<GetManyResponse<UserDto>> {
    const { rows, count } = await this.usersRepository.findAndCountAll<User>({ where: this.createWhereOptions(search), offset, limit });
    return this.createPageInfo(rows.map(u => new UserDto(u)), count, limit, offset);
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

  async getUserByPhone(phone: string, password?: string): Promise<UserDto> {
    const user: User = await this.usersRepository.findOne<User>({
      where: { phone, password },
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

  private createPageInfo<T>(data: T[], total: number, limit: number, offset: number): GetManyResponse<T> {
    return {
      data,
      count: data.length,
      total,
      page: limit ? Math.floor(offset / limit) + 1 : 1,
      pageCount: limit && total ? Math.ceil(total / limit) : 1,
    };
  }

  private createWhereOptions(search: { [k: string]: string }): WhereOptions<User> {
    const wh = {};
    Object
      .entries(search)
      .forEach(
        ([key, value]) => {
          wh[key] = { [Op.like]: `%${value}%` };
        });

    return wh;
  }
}
