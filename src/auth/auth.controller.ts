import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtResponse } from './types/token.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authDto: AuthDto): Promise<JwtResponse> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() authDto: AuthDto,
  ): Promise<JwtResponse> {
    return this.authService.signIn(res, authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;

    return this.authService.logout(user['sub']);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    // const user = req.user;
    const refreshToken = req.cookies['refreshToken'];

    return this.authService.refreshTokens(res, refreshToken);
  }
}
