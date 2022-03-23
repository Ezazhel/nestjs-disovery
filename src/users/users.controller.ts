import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as EmailValidator from 'email-validator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create an user' })
  @ApiResponse({ status: 422, description: 'Invalid Email' })
  @ApiResponse({ status: 200, description: 'success', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    if (!EmailValidator.validate(createUserDto.email))
      throw new HttpException('Invalid Email', HttpStatus.UNPROCESSABLE_ENTITY);

    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'The Users',
    type: User,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    description: 'The User',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete an user' })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
