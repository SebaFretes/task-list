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
}
