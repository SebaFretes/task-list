/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FirebaseService } from 'src/Firebase/firebase.service';

@Injectable()
export class TasksService {
  private collectionName = 'tasks';

  constructor(private readonly firebaseService: FirebaseService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.collectionName).doc();

    const task: Task = {
      id: docRef.id,
      title: createTaskDto.title,
      description: createTaskDto.description,
      done: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await docRef.set(task);
      return task;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to create task: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Failed to create task: Unknown error',
      );
    }
  }

  async getAllTasks(): Promise<Task[]> {
    const db = this.firebaseService.getFirestore();

    try {
      const snapshot = await db.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          done: data.done ?? false,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt ?? undefined,
        } as Task;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to fetch tasks: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Failed to fetch tasks: Unknown error',
      );
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const db = this.firebaseService.getFirestore();
      const docRef = db.collection(this.collectionName).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new Error('Task not found');
      }

      const data = doc.data();
      return {
        id: data?.id,
        title: data?.title,
        description: data?.description,
        done: data?.done ?? false,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt ?? undefined,
      } as Task;
    } catch (error) {
      throw new Error(`Failed to get task: ${(error as Error).message}`);
    }
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.collectionName).doc(id);

    try {
      const cleanedData: Partial<Task> = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      Object.keys(cleanedData).forEach(
        (key) =>
          cleanedData[key as keyof Task] === undefined &&
          delete cleanedData[key as keyof Task],
      );

      await docRef.set(cleanedData, { merge: true });

      const updatedDoc = await docRef.get();
      const updatedData = updatedDoc.data();
      if (!updatedData)
        throw new NotFoundException('Task not found after update');

      return {
        id: docRef.id,
        title: updatedData.title,
        description: updatedData.description,
        done: updatedData.done ?? false,
        createdAt: updatedData.createdAt,
        updatedAt: updatedData.updatedAt ?? undefined,
      } as Task;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to update task: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Failed to update task: Unknown error',
      );
    }
  }

  async deleteTask(id: string): Promise<void> {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.collectionName).doc(id);

    try {
      await docRef.delete();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to delete task: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Failed to delete task: Unknown error',
      );
    }
  }
}
