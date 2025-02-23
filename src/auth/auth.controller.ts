import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req, NotFoundException, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    try {
      return await this.authService.register(body.username, body.email, body.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('details')
  async details(@Body() body: {id: string}){
    try {
      return await this.authService.details(body.id);
    } catch (none){}
  }
  @Get('user/:id')
  async getUserWithTasks(@Param('id') id: string) {
    const user = await this.authService.getUserWithTasks(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
}

}
