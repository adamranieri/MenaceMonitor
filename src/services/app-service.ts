
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { DocumentReference, addDoc, collection, getFirestore, type DocumentData } from "firebase/firestore";
import type { MenaceReport, MenaceReportPayload } from "../lib/types";

const firebaseConfig = {
  apiKey: "AIzaSyAMs97EowVG7GKjxyzKwwLZHChDe2kusjU",
  authDomain: "menace-monitor.firebaseapp.com",
  projectId: "menace-monitor",
  storageBucket: "menace-monitor.appspot.com",
  messagingSenderId: "400829212927",
  appId: "1:400829212927:web:4c0f30149766dab868c4ca",
  measurementId: "G-FBBB41S1QX"
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const menacePicsRef = ref(storage,"menacePhotos");



export async function uploadFile(file:File):Promise<{path:string}>{
  const uuid = crypto.randomUUID() ?? "";
  const picRef = ref(menacePicsRef, uuid);
  const result = await uploadBytes(picRef, file);
  return {path:result.ref.fullPath};
}


export async function loadReports(amount?:number):Promise<MenaceReport[]>{
  throw new Error("NOT IMPLENTED");
}

export async function createMenaceReport(payload:MenaceReportPayload) :Promise<MenaceReport | {successfullyAdded:false}>{
  try {
    const docRef = await addDoc(collection(db, "reports"), payload);
    return {...payload, id:docRef.id, timestamp:0};
  } catch (error) {
    return {successfullyAdded:false};
  }

}

