import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

export interface UserState {
  ensureCanLogin(user: User): void; // lanza si no puede
}

export class ActiveState implements UserState {
  ensureCanLogin(_: User): void {
    // OK: no hace nada
  }
}

export class InactiveState implements UserState {
  ensureCanLogin(user: User): void {
    throw new UnauthorizedException(`Usuario ${user.username} inactivo`);
  }
}

// Fábrica simple de estados 
export function getUserState(user: User): UserState {
  return user.state === 'ACTIVE' ? new ActiveState() : new InactiveState();
}
