import { UnauthorizedException } from '@nestjs/common';
import type { ValidadorSesion } from './bridges/auth.bridge';
import { getUserState } from './state/user-state';
import { User } from '@prisma/client';
import { eliminarSesion } from './session.store';

export class AuthService {
  constructor(private readonly validador?: ValidadorSesion) {}

  async login(identificador: string, password: string) {
    if (!this.validador) {
      throw new Error('Validador no configurado para login');
    }

    const user: User | null = await this.validador.validar(identificador, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const state = getUserState(user);
    state.ensureCanLogin(user);

    return {
      mensaje: '✅ Sesión iniciada',
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    };
  }

  async logout(id: number) {
    eliminarSesion(id);
    return {
      mensaje: '✅ Sesión cerrada',
    };
  }
}