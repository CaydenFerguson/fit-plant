// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics"; //DONT NEED
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB4_xRRiYgw29S_DRWw6no3vyVT4voy7Gs',
  authDomain: 'fit-plants.firebaseapp.com',
  projectId: 'fit-plants',
  storageBucket: 'fit-plants.firebasestorage.app',
  messagingSenderId: '545622486148',
  appId: '1:545622486148:web:6e5b28501d4ee2a37ee6d1',
  measurementId: 'G-VMNZ7CLN05',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)
export { db }
// const analytics = getAnalytics(app); //DONT NEED
