// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebaseConfig from './firebaseEnv.js';
import { getFirestore } from "firebase/firestore";
import {getStorage, ref} from "firebase/storage";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

const storage = getStorage(app);

export const getStorageRef = (path) => ref(storage, path);