import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseController } from './Firebase/firebase.controller';
import { FirebaseService } from './Firebase/firebase.service';
import { TasksController } from './Tasks/tasks.controller';
import { TasksService } from './Tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AppController, FirebaseController, TasksController],
  providers: [AppService, FirebaseService, TasksService],
})
export class AppModule {}
