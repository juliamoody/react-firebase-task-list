import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

class Firebase {
  static singleton;
  static instance() {
    if (!Firebase.singleton) { Firebase.singleton = new Firebase(); }
    return Firebase.singleton;
  }

  constructor() {
    this.firebase = firebase.initializeApp({
      apiKey: "AIzaSyBli8daORrN-caPeOWcWsgoWD8xhLxf7-8",
      authDomain: "task-list-69136.firebaseapp.com",
      projectId: "task-list-69136",
      storageBucket: "task-list-69136.appspot.com",
      messagingSenderId: "420952068323",
      appId: "1:420952068323:web:d7d71047b9c82ad7d775d6",
      measurementId: "G-HLQ4LTHRJ6"
    });

    this.db = this.firebase.firestore();
    this.auth = this.firebase.auth();
  }
}

export default Firebase;;