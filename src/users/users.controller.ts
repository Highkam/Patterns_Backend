import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      if (
        error?.code === '23505' || // Postgres unique violation
        error?.message?.includes('duplicate key') ||
        error?.message?.includes('already exists')
      ) {
        throw new HttpException(
          'Username or email already exists',
          HttpStatus.CONFLICT
        );
      }
      throw error;
    }
  }

  @Get()
  @Roles(1)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email/:email')
  @Roles(1)
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('username/:username')
  @Roles(1)
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  @Roles(1)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(1)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(1)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
