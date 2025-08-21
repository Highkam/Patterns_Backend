import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService} from './roles.service';
import { CreateRoleDto} from './roles.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Roles(1)
@Controller('roles') 
export class RolesController { 
  constructor(private readonly rolesService: RolesService) {} 

  @Post() 
  async create(@Body() data: CreateRoleDto) { 
    return this.rolesService.create(data); 
  } 

  @Get() 
  findAll() { 
    return this.rolesService.findAll(); 
  } 

  @Get(':id') 
  findOne(@Param('id') id: number) { 
    return this.rolesService.findOne(+id); 
  } 

  @Patch(':id') 
  update(@Param('id') id: number, @Body() data: CreateRoleDto) { 
    return this.rolesService.update(+id, data); 
  } 
  
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return this.rolesService.delete(+id); 
  } 
}
