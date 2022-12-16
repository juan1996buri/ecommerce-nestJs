import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserDetail } from './entities/user-detail.entity';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}
  async create(createUserDetailDto: CreateUserDetailDto) {
    const userDetail = await this.userDetailRepository.create(
      createUserDetailDto,
    );
    return await this.userDetailRepository.save(userDetail);
  }

  async findAll() {
    const allUserDetail = await this.userDetailRepository.find();
    if (allUserDetail.length <= 0) {
      throw new NotFoundException('User detail Not Found');
    }
    return allUserDetail;
  }

  async findOne(id: number) {
    const userDetail = await this.userDetailRepository.findOneBy({ id });
    if (!userDetail) {
      throw new NotFoundException('User Detail Not Found');
    }
    return userDetail;
  }

  async update(updateUserDetailDto: UpdateUserDetailDto) {
    const oldUserDetail = await this.findOne(updateUserDetailDto.id);
    const newOld = Object.assign(oldUserDetail, updateUserDetailDto);
    return await this.userDetailRepository.save(newOld);
  }

  async remove(id: number) {
    const userDetail = await this.findOne(id);
    await this.userDetailRepository.remove(userDetail);
  }
}
