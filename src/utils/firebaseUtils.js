import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
  onSnapshot,
  query,
  getDoc,
} from 'firebase/firestore'
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

export const FirestoreListenToNews = () => {
  try {
    const colQuery = query(newsRef)
    let dataList = []
    const unsubscribe = onSnapshot(colQuery, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        const id = doc.id
        data.push({ ...doc.data(), id })
      })
      dataList = data
    })
    return { unsubscribe, dataList }
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
    console.log('error posting news', e)
    return
  }
}

export const FirestoreChangeNewsStatus = async (docId, status) => {
  try {
    const docRef = doc(newsRef, docId)
    await updateDoc(docRef, {
      published: status,
    })
  } catch (e) {
    console.log('error changing status news', e)
    return
  }
}

export const FirestoreGetOneNews = async (id) => {
  try {
    const docSnapshot = await getDoc(doc(newsRef, id))
    if (docSnapshot.exists()) {
      console.log(docSnapshot.data())
      return { ...docSnapshot.data(), id: docSnapshot.id }
    } else {
      console.log('not exist', docSnapshot.data())
      return null
    }
  } catch (e) {
    console.log('error changing status news', e)
    return null
  }
}

export const FirestoreUpdateOneNews = async (news) => {
  try {
    await updateDoc(doc(newsRef, news.id), {
      createdAt: Timestamp.now(),
      timestamp: Date.now(),
      title: news.title,
      body: news.body,
    })
    return
  } catch (e) {
    console.log('error updating news', e)
    return
  }
}
