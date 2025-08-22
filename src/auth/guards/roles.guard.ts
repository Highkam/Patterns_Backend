import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { obtenerSesion } from '../session.store';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    const user = obtenerSesion(Number(userId));

    if (!user) {
      throw new UnauthorizedException('No has iniciado sesión');
    }

    return requiredRoles.includes(user.roleId);
  }
}
