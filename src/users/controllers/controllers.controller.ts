import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnumApiTags } from 'src/enums/api-tags';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
@Controller('users')
@ApiTags(EnumApiTags.USERS)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
    return `O com o id ${id} foi deletada com sucesso`;
  }
}
