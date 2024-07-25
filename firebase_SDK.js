// Firebase SDK 모듈 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyBioYVdSd1mDUd2EiezVCS2a6BmcoWTB04",
    authDomain: "qwer-e018d.firebaseapp.com",
    databaseURL: "https://qwer-e018d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "qwer-e018d",
    storageBucket: "qwer-e018d.appspot.com",
    messagingSenderId: "483116214677",
    appId: "1:483116214677:web:78fa933b3cdeb51ec2ae9c",
    measurementId: "G-C3HTEK9SGH"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

export { app, analytics, auth, database };
