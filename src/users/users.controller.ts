import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UnauthorizedException, Res, HttpStatus, NotFoundException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/register-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly bcryptService: BcryptService) { }

  @Post('/register')
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

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
    const { usernameOrEmail, password } = loginUserDto

    const data = await this.usersService.findOneByEmailOrUsername(usernameOrEmail)
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
}
