import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto/auth.dto';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtTokens } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp({ email, password }: AuthDto): Promise<JwtTokens> {
    const hashedPwd = await this.hashData(password);

    const newUser = await this.dbService.user.create({
      data: {
        email,
        hashedPwd,
      },
    });

    const tokens = await this.getJwtTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async signIn(authDto: AuthDto): Promise<JwtTokens | HttpException> {
    const user = await this.dbService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user)
      return new ForbiddenException('No user exists with the provided email!');

    const doesPasswordMatch = await argon2.verify(
      user.hashedPwd,
      authDto.password,
    );

    if (!doesPasswordMatch)
      return new ForbiddenException('Password is not correct!');

    const tokens = await this.getJwtTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(id: string) {
    await this.dbService.user.updateMany({
      where: {
        id,
        hashedRT: {
          not: null,
        },
      },
      data: {
        hashedRT: null,
      },
    });
  }

  refreshTokens() {}

  // Auth service utils

  private async updateRefreshTokenHash(id: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);

    await this.dbService.user.update({
      where: {
        id,
      },
      data: {
        hashedRT: hash,
      },
    });
  }

  private async getJwtTokens(id: string, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_AT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private hashData(data: string) {
    return argon2.hash(data);
  }
}
