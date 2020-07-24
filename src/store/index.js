import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')
Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
  } else {
    store.commit('setCurrentUser', null)
  }
})

export const store = new Vuex.Store({
  state: {
  	currentUser: null,
    userProfile: {},
  },
  actions: {
  	fetchUserProfile({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          commit('setUserProfile', doc.data())
        } else {
        }
      })
    },
    signUserUp({ commit }, payload) {
      fb.auth.createUserWithEmailAndPassword(this.email, this.password).then(UserCredential => {
      	console.log(UserCredential.user.uid)
      	fb.usersCollection.doc(UserCredential.user.uid).set({
      		id: UserCredential.user.uid,
          email: UserCredential.user.email,
          created: fb.firestore.FieldValue.serverTimestamp(),
          photoURL: (UserCredential.user.photoURL || null),
          displayName: (UserCredential.user.displayName || null),
        })

        .then(() => {
        	let currentUser = fb.auth.currentUser
        	currentUser.sendEmailVerification().then(function() {
					}).catch(function(error) {
					  console.log(error)
					})
				})
  		}).catch(err => {
        console.log(err)
      })
    },
    signInWithGoogle({ commit }) {
      var provider = new fb.autho.GoogleAuthProvider();
      fb.auth.signInWithPopup(provider)
      .then(
        UserCredential => {
	      	console.log(UserCredential.user.uid)
	        fb.usersCollection.doc(UserCredential.user.uid).set({
	          id: UserCredential.user.uid, 
	          email: UserCredential.user.email, 
	          photoURL: UserCredential.user.photoURL,
	          displayName: UserCredential.user.displayName,
	          created: fb.firestore.FieldValue.serverTimestamp(),
	        })

	        .then(() => {
	        	let currentUser = fb.auth.currentUser
	        	currentUser.sendEmailVerification().then(function() {
						}).catch(function(error) {
						  console.log(error)
						})
					})
		    }).catch(err => {
        console.log(err)
      })
    },
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
  },
  mutations: {
  	setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
})