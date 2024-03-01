import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhGr4Llfi0WnjboXPmVEI58c1gxEaKRws",
  authDomain: "image-upload-96810.firebaseapp.com",
  projectId: "image-upload-96810",
  storageBucket: "image-upload-96810.appspot.com",
  messagingSenderId: "970283479102",
  appId: "1:970283479102:web:f8c3264009cccf4a7f216f",
};

const app = initializeApp(firebaseConfig);

//Authentication
const appAuth = getAuth(app);

//firestore DB
const appDB = getFirestore(app);

//Storage DB
const imageDb = getStorage(app);

export { appDB, imageDb };
