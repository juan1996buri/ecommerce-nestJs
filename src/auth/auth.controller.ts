import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() req: UserEntity) {
    return await this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() req: UserEntity) {
    return req;
  }
}
