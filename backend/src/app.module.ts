import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseController } from './Firebase/firebase.controller';
import { FirebaseService } from './Firebase/firebase.service';

@Module({
  imports: [],
  controllers: [AppController, FirebaseController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
