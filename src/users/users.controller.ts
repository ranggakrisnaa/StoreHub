import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UnauthorizedException, Res, HttpStatus, NotFoundException, BadRequestException, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/register-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly bcryptService: BcryptService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
    const { email, name, username, role, password, confirmPassword } = createUserDto
    try {

      if (password !== confirmPassword) throw new UnauthorizedException('Password is not match')
      const hashPassword = await this.bcryptService.hashPassword(confirmPassword)

      const data = await this.usersService.createUser({ email, username, name, password: hashPassword, role })

      return res.status(HttpStatus.CREATED).json({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "User created successfully.",
        data
      })
    } catch (error) {
      if (error !== InternalServerErrorException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
    const { usernameOrEmail, password } = loginUserDto
    try {
      const data = await this.usersService.findUser({
        OR: [
          { email: usernameOrEmail },
          { username: usernameOrEmail }
        ]
      })
      if (!data) throw new NotFoundException('User name or email is not found.')

      const checkPassword = await this.bcryptService.comparePassword(password, data.password)
      if (!checkPassword) throw new BadRequestException('Password is invalid.')

      return res.status(HttpStatus.OK).json({
        success: true,
        statusCode: HttpStatus.OK,
        message: "User login successfully."
      })
    } catch (error) {
      if (error !== InternalServerErrorException) {
        throw error
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

}
