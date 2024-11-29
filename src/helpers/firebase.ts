import { Auth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

// This file contains various helpers for firebase

export default async function getUserData(
  db: any,
  auth: Auth,
  database: string
) {
  const userId = auth?.currentUser?.uid

  const docRef = doc(db, database, String(userId))
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Fetched:', docSnap.data())
    return docSnap.data()
  } else {
    console.log('No such document!', database)
  }
}
