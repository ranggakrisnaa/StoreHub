import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UnauthorizedException, Res, HttpStatus, NotFoundException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-dto.dto';


@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly bcryptService: BcryptService) { }

  @Post()
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
    try {
      const { email, name, username, role, password, confirmPassword } = createUserDto

      if (password !== confirmPassword) throw new UnauthorizedException('Password is not match')
      const hashPassword = this.bcryptService.hashPassword(confirmPassword)

      await this.usersService.create({ email, username, name, password: hashPassword, role })

      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "User created successfully."
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Post()
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
    const { username, email, password } = loginUserDto

    const data = await this.usersService.findOneByEmailOrUsername(username, email)
    if (!data) throw new NotFoundException('User name or email is not found.')
    try {
      const checkPassword = this.bcryptService.comparePassword(password, data.password)
      if (!checkPassword) throw new UnauthorizedException('Password is invalid.')

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User login successfully."
      })
    } catch (error) {
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
