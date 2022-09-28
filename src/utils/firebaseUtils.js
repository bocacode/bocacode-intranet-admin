import { collection, getDocs } from 'firebase/firestore'
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
