import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAMf5_H6GOUA-8I7tv78XmxRhu2jyKJCzM',
  authDomain: 'homeflix-1999e.firebaseapp.com',
  projectId: 'homeflix-1999e',
  storageBucket: 'homeflix-1999e.appspot.com',
  messagingSenderId: '260930217414',
  appId: '1:260930217414:web:246366752e921453907ec7',
  measurementId: 'G-C5WCM5HZER',
  databaseURL:
    'https://homeflix-1999e-default-rtdb.europe-west1.firebasedatabase.app',
});

export default app;
