import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto/auth.dto';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtResponse } from './types/token.type';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp({ email, password }: AuthDto): Promise<JwtResponse> {
    const hashedPwd = await this.hashData(password);

    const newUser = await this.dbService.user.create({
      data: {
        email,
        hashedPwd,
      },
    });

    const tokens = await this.getJwtTokens(newUser.id, newUser.email);
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token);

    return {
      ...tokens,
    };
  }

  async signIn(res: Response, authDto: AuthDto): Promise<JwtResponse> {
    const user = await this.dbService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user)
      throw new ForbiddenException('No user exists with the provided email!');

    const doesPasswordMatch = await argon2.verify(
      user.hashedPwd,
      authDto.password,
    );

    if (!doesPasswordMatch)
      throw new ForbiddenException('Password is not correct!');

    const tokens = await this.getJwtTokens(user.id, user.email);
    res.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
    });

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return {
      ...tokens,
    };
  }

  async logout(id: number) {
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

  async refreshTokens(
    res: Response,
    refreshToken: string | undefined,
  ): Promise<JwtResponse> {
    if (!refreshToken)
      throw new ForbiddenException('Brak tokenu uwierzytelniającego!');

    const rtData = this.jwtService.decode(refreshToken) as JwtResponse['data'];

    if (!('sub' in rtData)) throw new ForbiddenException('Niepoprawny token!');

    console.log(rtData);

    const user = await this.dbService.user.findUnique({
      where: {
        id: rtData.sub,
      },
    });

    if (!user || !user.hashedRT) throw new ForbiddenException('Brak dostępu!');

    const doTokensMatch = await argon2.verify(user.hashedRT, refreshToken);

    if (!doTokensMatch) throw new ForbiddenException('Przestarzały token!');

    const tokens = await this.getJwtTokens(user.id, user.email);
    res.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
    });

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return {
      ...tokens,
    };
  }

  // Auth service utils

  private async updateRefreshTokenHash(id: number, refreshToken: string) {
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

  private async getJwtTokens(id: number, email: string) {
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
      data: this.jwtService.decode(access_token),
    } as JwtResponse;
  }

  private hashData(data: string) {
    return argon2.hash(data);
  }
}
