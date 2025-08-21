import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { obtenerSesion } from '../session.store';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    const user = obtenerSesion(Number(userId));

    if (!user) {
      throw new UnauthorizedException('❌ No has iniciado sesión');
    }

    // Compara contra roleId
    return requiredRoles.some((roleId) => roleId === user.roleId);
  }
}