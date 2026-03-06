import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto>{
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('admin-test')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  adminOnly() {
    return { message: 'Admin access granted' };
  }
}