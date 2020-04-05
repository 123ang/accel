import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyA93Qy4d9YTRBvmrPtxLfaHhWDz3q3zxvI",
    authDomain: "accel-74ad6.firebaseapp.com",
    databaseURL: "https://accel-74ad6.firebaseio.com",
    projectId: "accel-74ad6",
    storageBucket: "accel-74ad6.appspot.com",
    messagingSenderId: "232787695803",
    appId: "1:232787695803:web:b504b81640a6e52be0b19e",
    measurementId: "G-HTLMENCNSE"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore()
