import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.rolesRepository.findOneBy({ id: 2 });
    const newUser = this.userRepository.create({
      ...createUserDto,
      role,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    const usersAll = await this.userRepository.find();
    if (usersAll.length <= 0) {
      throw new NotFoundException('Users Not Found');
    }
    return usersAll;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const oldUser = await this.findOne(updateUserDto.id);
    const newUser = Object.assign(oldUser, updateUserDto);
    return await this.userRepository.save(newUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
