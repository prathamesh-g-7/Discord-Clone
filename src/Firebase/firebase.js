import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCLhZUGMqgt7qmHaSB5FKn0gE1RmKpABgc",
  authDomain: "discord-clone-bcdc1.firebaseapp.com",
  projectId: "discord-clone-bcdc1",
  storageBucket: "discord-clone-bcdc1.appspot.com",
  messagingSenderId: "605024059322",
  appId: "1:605024059322:web:2a7c292e1439b052652783",
  measurementId: "G-FJ65FECGX3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
