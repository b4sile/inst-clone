import { createContext } from 'react';
import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCHSdDmDdqClqpU_Y9GogMQP-o-ukVZ-xA',
  authDomain: 'instagram-bf61f.firebaseapp.com',
  projectId: 'instagram-bf61f',
  storageBucket: 'instagram-bf61f.appspot.com',
  messagingSenderId: '323621794662',
  appId: '1:323621794662:web:7f59962b20d1e1a219cea7',
};

export const firebase = Firebase.initializeApp(config);
export const { FieldValue } = Firebase.firestore;
export const storageRef = Firebase.storage().ref();

export class FirebaseAuthError implements Firebase.auth.Error {
  constructor(readonly code: string, readonly message: string) {}
}
export interface FirebaseContextInterface {
  firebase: Firebase.app.App;
  FieldValue: typeof FieldValue;
}

export const FirebaseContext = createContext<FirebaseContextInterface>(
  {} as FirebaseContextInterface
);
