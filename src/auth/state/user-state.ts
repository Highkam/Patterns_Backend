import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

export interface UserState {
  ensureCanLogin(user: User): void; 
}

export class ActiveState implements UserState {
  ensureCanLogin(_: User): void {
  }
}

export class InactiveState implements UserState {
  ensureCanLogin(user: User): void {
    throw new UnauthorizedException(`Usuario ${user.username} inactivo`);
  }
}
export function getUserState(user: User): UserState {
  return user.state === 'ACTIVE' ? new ActiveState() : new InactiveState();
}

