import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FirebaseService {
  private defaultApp: admin.app.App;

  constructor() {
    this.defaultApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FB_PROJECT_ID,
        clientEmail: process.env.FB_CLIENT_EMAIL,
        privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  getAuth() {
    return this.defaultApp.auth();
  }

  getFirestore(): Firestore {
    return this.defaultApp.firestore() as unknown as Firestore;
  }

  async createUser(email: string, password: string) {
    try {
      const auth = this.getAuth();
      const user = await auth.createUser({ email, password });
      return { success: true, userId: user.uid };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
}
