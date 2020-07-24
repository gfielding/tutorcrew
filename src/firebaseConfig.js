const firebase = require("firebase/app")

require("firebase/auth")
require("firebase/storage")
require("firebase/firestore")
require("firebase/functions")
require("firebase/analytics")

// firebase init goes here
const firebaseConfig = {
  apiKey: "AIzaSyDkVohLhk4TiLfujT_5NeXjLl2Uv9CIMK4",
  authDomain: "tutor-5e5ec.firebaseapp.com",
  databaseURL: "https://tutor-5e5ec.firebaseio.com",
  projectId: "tutor-5e5ec",
  storageBucket: "tutor-5e5ec.appspot.com",
  messagingSenderId: "608875842030",
  appId: "1:608875842030:web:a3a45b95111f19a482a6ff",
  measurementId: "G-L1SLHS5D80"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const firestore = firebase.firestore
const auth = firebase.auth()
const autho = firebase.auth
const storageRef = firebase.storage().ref()
const currentUser = auth.currentUser
const functions = firebase.functions()

// firebase collections
const usersCollection = db.collection('users')

export {
  db,
  auth,
  autho,
  storageRef,
  firestore,
  currentUser,
  functions,
  usersCollection,
}