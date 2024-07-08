import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { BcryptService } from 'src/bcrypt/bcrypt.service';


@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly bcryptService: BcryptService) { }

  @Post()
  register(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    try {
      const { password, confirmPassword } = createUserDto

      if (password !== confirmPassword) throw new UnauthorizedException('Password is not match')
      const hashPassword = this.bcryptService.hashPassword(confirmPassword)
      return this.usersService.create({ email: createUserDto.email, username: createUserDto.username, name: createUserDto.name, password: hashPassword, role: createUserDto.role })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
