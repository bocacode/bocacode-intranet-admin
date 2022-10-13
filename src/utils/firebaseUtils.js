import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore'
import { firestore } from 'src/firebaseConfig'

const newsRef = collection(firestore, 'news')

export const FirestoreGetNews = async () => {
  try {
    let data = []
    const querySnaphot = await getDocs(newsRef)
    querySnaphot.docs.forEach((doc) => {
      const id = doc.id
      return data.push({ ...doc.data(), id })
    })
    return data
  } catch (e) {
    console.log('error getting news', e)
    return
  }
}

export const FirestorePostNews = async ({ body, title }) => {
  try {
    const documentReference = await addDoc(newsRef, {
      createdAt: Timestamp.now(),
      timestamp: Date.now(),
      title,
      body,
    })
    return documentReference.id
  } catch (e) {
    console.log('error getting news', e)
    return
  }
}
