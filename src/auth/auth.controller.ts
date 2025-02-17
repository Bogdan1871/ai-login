import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    return this.authService.register(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async protectedRoute(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Specify the required role
  @Post('admin')
  async me(@Request() req) {
    return req.user;
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.newPassword);
  }

  @Post('confirm-email')
  async confirmEmail(@Body() body: { email: string; token: string }) {
    return this.authService.confirmEmail(body.email, body.token);
  }
}
