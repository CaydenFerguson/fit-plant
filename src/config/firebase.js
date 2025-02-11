// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
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

// Set persistence for Firebase Auth
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local')
  })
  .catch((error) => {
    console.error('Error setting persistence:', error)
  })

export const db = getFirestore(app)
