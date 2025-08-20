import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { ValidadorPorEmail, ValidadorPorUsername } from './bridges/auth.bridge';
import { LoginDto } from '../users/dto/login.dto'; // 👈 importa este

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('login-email')
  @HttpCode(200)
  async loginEmail(@Body() dto: LoginDto) {
    const auth = new AuthService(new ValidadorPorEmail(this.prisma));
    return auth.login(dto.identificador, dto.password);
  }

  @Post('login-username')
  @HttpCode(200)
  async loginUsername(@Body() dto: LoginDto) {
    const auth = new AuthService(new ValidadorPorUsername(this.prisma));
    return auth.login(dto.identificador, dto.password);
  }
}
