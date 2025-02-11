import { Auth } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// This file contains various helpers for firebase

export async function getUserData(db: any, auth: Auth, database: string) {
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

export async function setDataFirebase(
  collection: string,
  auth: Auth,
  db: any,
  data: Object
) {
  if (auth.currentUser) {
    console.log('this is what is seen', data)
    const uid = auth.currentUser.uid
    try {
      await setDoc(doc(db, collection, uid), data)
    } catch (error) {
      console.error('Error setting document:', error)
    }
  }
}
