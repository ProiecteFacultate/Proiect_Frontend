import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZ_1ICSx_eS0mBV6pnPwsYn3JU11Ti15U",
  authDomain: "proiect-frontend-b1131.firebaseapp.com",
  projectId: "proiect-frontend-b1131",
  storageBucket: "proiect-frontend-b1131.appspot.com",
  messagingSenderId: "478442955931",
  appId: "1:478442955931:web:237ec9a4e32a5a56a0523e"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const firebaseStorage = getStorage(app);