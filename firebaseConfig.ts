import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyDP9s23eF5_fyzOHHL1UI9tmnZ48whfg00',
  authDomain: 'krad-a01a4.firebaseapp.com',
  projectId: 'krad-a01a4',
  storageBucket: 'krad-a01a4.firebasestorage.app',
  messagingSenderId: '369119602671',
  appId: '1:369119602671:web:2306e06a1e94c6f522781a',
  measurementId: 'G-N9YQCGF8D8'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
