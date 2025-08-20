// src/auth/bridges/auth.bridge.ts
import { PrismaService } from '../../prisma/prisma.service';

export interface ValidadorSesion {
  validar(identificador: string, password: string): Promise<boolean>;
}

export class ValidadorPorEmail implements ValidadorSesion {
  constructor(private prisma: PrismaService) {}
  async validar(email: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // si quieres bloquear inactivos, descomenta la línea del state
    return !!user && user.password === password /* && user.state === 'ACTIVE' */;
  }
}

export class ValidadorPorUsername implements ValidadorSesion {
  constructor(private prisma: PrismaService) {}
  async validar(username: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return !!user && user.password === password /* && user.state === 'ACTIVE' */;
  }
}
