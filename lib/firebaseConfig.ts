import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8dCIK4OtKZx6nqlWu1Cu-ZmN6m1W5zAs",
  authDomain: "simple-shop-list.firebaseapp.com",
  projectId: "simple-shop-list",
  storageBucket: "simple-shop-list.appspot.com",
  messagingSenderId: "353730474120",
  appId: "1:353730474120:web:2f9b051c4ded9ca29caf3d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);