
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { ValidadorSesion } from './bridges/auth.bridge';


export class AuthService {
  constructor(private readonly validador: ValidadorSesion) {}

  async login(identificador: string, password: string) {
    const valido = await this.validador.validar(identificador, password);
    if (!valido) throw new UnauthorizedException('Credenciales inválidas');
    return { mensaje: '✅ Sesión iniciada' };
  }
}
