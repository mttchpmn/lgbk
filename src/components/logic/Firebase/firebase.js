import app from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    app.analytics();

    this.auth = app.auth();
    this.db = app.database();
    this.timestamp = app.database.ServerValue.TIMESTAMP;
  }

  //  *** AUTH API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** USER API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref(`users`);

  // *** ENTRIES API ***
  entries = uid => this.db.ref(`entries/${uid}`);
  entry = (uid, key) => this.db.ref(`entries/${uid}/${key}`);

  // createEntry = ({ uid, title, content }) => {
  //   this.db.ref(`users/${uid}/entries`).push({ title, content });
  // };
}

export default Firebase;
