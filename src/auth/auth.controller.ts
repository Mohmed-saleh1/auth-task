import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Headers,
  UnauthorizedException,
  // Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignupDto } from './Dtos/signup.dto';
import { LoginDto } from './Dtos/login.dto';
// import { AuthenticationRequest } from './auth.types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const result = await this.authService.signup(signupDto);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message });
  }

  // Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    // req.user = result.user;
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  }

  // Verify Email
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body('code') code: string, @Res() res: Response) {
    const result = await this.authService.verifyEmail(code);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message });
  }

  // Resend Email Verification
  @Post('resend-verify-email')
  @HttpCode(HttpStatus.OK)
  async resendEmailVerifyCode(
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.reSendEmailVerifyCode(email);
    return res.json({ message: result.message });
  }

  // Forgot Password
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body('email') email: string, @Res() res: Response) {
    await this.authService.forgotPassword(email);
    return res.json({ message: 'Password reset email sent' });
  }

  // Verify Reset Password Code
  @Post('verify-reset-code')
  @HttpCode(HttpStatus.OK)
  async verifyPasswordResetCode(
    @Body('code') code: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.verifyPasswordResetCode(code);
    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message });
  }

  // Reset Password

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Headers('Authorization') authorization: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authorization.replace('Bearer ', '');
    const result = await this.authService.resetPassword(token, password);

    res.setHeader('Authorization', `Bearer ${result.token}`);
    return res.json({ message: result.message, token });
  }
}
