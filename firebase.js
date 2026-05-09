import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
onSnapshot,
deleteDoc,
doc,
updateDoc,
getDoc,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAdUs4fWPVsxCxCEm8hnClFBC49NpBXZUI",
authDomain: "sound-369.firebaseapp.com",
projectId: "sound-369",
storageBucket: "sound-369.appspot.com",
messagingSenderId: "628575895406",
appId: "1:628575895406:web:cb75494ad2364515f50b7f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
db,
collection,
addDoc,
onSnapshot,
deleteDoc,
doc,
updateDoc,
getDoc,
query,
orderBy
};