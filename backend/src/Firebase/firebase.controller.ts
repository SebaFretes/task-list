/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { RegisterDto } from './dto/register.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('test-auth')
  testAuth() {
    const auth = this.firebaseService.getAuth();
    return { message: 'Firebase Auth service is working!', auth: !!auth };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const result = await this.firebaseService.createUser(email, password);

    if (result.success) {
      return { message: 'User registered successfully', userId: result.userId };
    }
    return { message: 'Error creating user', error: result.error };
  }

  @Post('login')
  async login(@Body() loginDto: RegisterDto) {
    const { email, password } = loginDto;
    try {
      const token = await this.firebaseService.loginUser(email, password);
      return { message: 'Login successful', token };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: 'Login failed', error: error.message };
      }
      return { message: 'Login failed', error: 'Unknown error' };
    }
  }
}
