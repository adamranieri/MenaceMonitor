
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { DocumentReference, addDoc, collection, getFirestore, type DocumentData, query, orderBy, limit, getDocs, QuerySnapshot } from "firebase/firestore";
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
const reportsRef = collection(db,"reports");



export async function uploadFile(file:File):Promise<{path:string}>{
  const uuid = crypto.randomUUID() ?? "";
  const picRef = ref(menacePicsRef, uuid);
  const result = await uploadBytes(picRef, file);
  return {path:`https://firebasestorage.googleapis.com/v0/b/menace-monitor.appspot.com/o/menacePhotos%2F${result.ref.name}?alt=media`};
}


export async function loadReports(amount:number = 10):Promise<MenaceReport[]>{
  const q = query(reportsRef, limit(amount));
  const snapShot = await getDocs(q);
  const reports:MenaceReport[] = []; 
  snapShot.forEach(doc => reports.push(doc.data() as MenaceReport));
  return reports;
}

export async function createMenaceReport(payload:MenaceReportPayload) :Promise<MenaceReport | {successfullyAdded:false}>{
  try {
    const docRef = await addDoc(reportsRef, payload);
    return {...payload, id:docRef.id};
  } catch (error) {
    return {successfullyAdded:false};
  }

}

