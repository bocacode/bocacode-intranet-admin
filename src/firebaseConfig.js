import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: 'bocacode-intranet-api.firebaseapp.com',
  databaseURL: 'https://bocacode-intranet-api-default-rtdb.firebaseio.com',
  projectId: 'bocacode-intranet-api',
  storageBucket: 'bocacode-intranet-api.appspot.com',
  messagingSenderId: '1026413154242',
  appId: process.env.REACT_APP_FB_ID,
}

let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

export const storage = getStorage(app)
export const firestore = getFirestore(app)
