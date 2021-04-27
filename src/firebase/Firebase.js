// import app, { firestore } from 'firebase/app'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// const config = {
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
})

class Firebase {
  constructor() {
    // app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.firestore()
  }

  //Auth API
  createUserWithEmailAndPassword = async (email, password) => {
    return await this.auth.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmailAndPassword = async (email, password) => {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut = () => {
    this.auth.signOut()
  }

  passwordReset = email => {
    this.auth.sendPasswordResetEmail(email)
  }

  passwordUpdate = password => {
    this.auth.currentUser.updatePassword(password)
  }

  //Database API
  users = async () => {
    return await this.db.collection('users')
  }

  user = async (uid) => {
    return await this.db.collection('users').doc(uid)
  }

  getUser = async (uid) => {
    let user = await this.db.collection('users').doc(uid)
    user = await user.get()
    return user.data()
  }

  addPost = async (uid, postid) => {
    const user = await this.user(uid)
    return await user.update({ posts: firebase.FieldValue.arrayUnion(postid) })
  }

  updatePost = async (uid, postid) => {
    const user = await this.user(uid)
    return await user.update({ posts: firebase.FieldValue.arrayRemove(postid) })
  }

  flights = () => {
    const flightRef = this.db.collection('flights');
    return flightRef
  }

  // new function
  updateFlight = async (pk, flight) => {
    const flightRef = this.db.collection('flights').doc(pk); // Find
    flightRef.update(flight);
  }
  addLikeOnFlight = async (pk, current, likes) => {
    const data = { current: current + 1, likes: likes };
    const flightRef = this.db.collection('flights').doc(pk);
    flightRef.update(data);
  }

  removeFlight = async (pk) => {
    const flightRef = this.db.collection('flights').doc(pk);
    flightRef.delete();
  }
}

export default Firebase