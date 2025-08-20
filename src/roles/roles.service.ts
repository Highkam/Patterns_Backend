import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './roles.dto';

import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
@Injectable()
export class RolesService implements IRolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    return this.prisma.role.create({ data });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async update(id: number, data: CreateRoleDto) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}


export interface IRolesService {
  create(data: CreateRoleDto);
  findAll();
  findOne(id: number);
  update(id: number, data: CreateRoleDto);
  delete(id: number);
}

export class BaseRolesDecorator implements IRolesService {
  constructor(protected readonly wrapped: IRolesService) {}

  create(data: CreateRoleDto) {
    return this.wrapped.create(data);
  }

  findAll() {
    return this.wrapped.findAll();
  }

  findOne(id: number) {
    return this.wrapped.findOne(id);
  }

  update(id: number, data: CreateRoleDto) {
    return this.wrapped.update(id, data);
  }

  delete(id: number) {
    return this.wrapped.delete(id);
  }
}

export class RolesServiceWithPermission extends BaseRolesDecorator {
  constructor(
    wrapped: IRolesService,
    private readonly currentUserRole: string,
  ) {
    super(wrapped);
  }

  findAll() {
    if (this.currentUserRole !== 'admin') {
      throw new Error('Acceso denegado: solo admin puede ver todos los roles');
    }
    return super.findAll();
  }

  delete(id: number) {
    if (this.currentUserRole !== 'admin') {
      throw new Error('Acceso denegado: solo admin puede eliminar roles');
    }
    return super.delete(id);
  }
}