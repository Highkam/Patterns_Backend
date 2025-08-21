import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './roles.dto';

import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: {
        name: data.name,
        permission_enabled: data.permission_enabled,
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
