// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA06UDj6bxo4dwPj1vQuGgHUM5BfmO7sAs",
  authDomain: "book-catalog-79fed.firebaseapp.com",
  databaseURL: "https://book-catalog-79fed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "book-catalog-79fed",
  storageBucket: "book-catalog-79fed.appspot.com",
  messagingSenderId: "569392416516",
  appId: "1:569392416516:web:aa12a548896c9d3895f251"
};

export const firebase = initializeApp(firebaseConfig);
export const db = getDatabase(firebase);