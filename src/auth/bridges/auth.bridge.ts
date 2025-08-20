import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

export interface ValidadorSesion {
  validar(identificador: string, password: string): Promise<User | null>;
}

export class ValidadorPorEmail implements ValidadorSesion {
  constructor(private prisma: PrismaService) {}
  async validar(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) return null;
    return user;
  }
}

export class ValidadorPorUsername implements ValidadorSesion {
  constructor(private prisma: PrismaService) {}
  async validar(username: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || user.password !== password) return null;
    return user;
  }
}
