import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './roles.dto';

import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: {
        name: data.name,
        permissions: {
          set: data.permissions,
        },
      },
    });
  }

  update(id: number, data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  findOne(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }
}
