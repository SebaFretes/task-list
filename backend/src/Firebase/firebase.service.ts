/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

  async loginUser(email: string, password: string) {
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        },
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.idToken;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error logging in user');
    }
  }
}
