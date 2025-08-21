import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { AuthValidatorFactory } from './factory/auth.factory';
import { AuthService } from './auth.service';
import { guardarSesion } from './session.store';

@Controller('auth')
export class AuthController {
  constructor(private readonly factory: AuthValidatorFactory) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const mode = dto.mode ?? this.factory.inferMode(dto.identificador);
    const validator = this.factory.create(mode);
    const auth = new AuthService(validator);
    const user = await auth.login(dto.identificador, dto.password);

    guardarSesion(user); // guardamos la sesión
    return user;
  }
}