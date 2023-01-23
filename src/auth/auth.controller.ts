import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserEntity,
  ) {
    const data = await this.authService.login(user, res);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario logeado con exito',
      ...data,
    };
  }

  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }

  @Get('me')
  async me(@Res({ passthrough: true }) res, @Req() req) {
    const data = await this.authService.me(res, req);

    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario logeado con exito',
      ...data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
