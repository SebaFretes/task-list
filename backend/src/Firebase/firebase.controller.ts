import { Controller, Get } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('test-auth')
  testAuth() {
    const auth = this.firebaseService.getAuth();
    return { message: 'Firebase Auth service is working!', auth: !!auth };
  }
}
