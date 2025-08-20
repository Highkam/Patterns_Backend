import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService, IRolesService, RolesServiceWithPermission } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './roles.dto';

@Controller('roles')
export class RolesController {
  private readonly service: IRolesService;
  constructor(rolesService: RolesService) {
    const currentUserRole = 'user'; // Esto debería venir de la sesión del usuario
    this.service = new RolesServiceWithPermission(rolesService, currentUserRole);
  }

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: CreateRoleDto) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
