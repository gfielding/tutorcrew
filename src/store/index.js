import Vue from 'vue'
import Vuex from 'vuex'
import router from 'vue-router'
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
    fbError: null,
    loginError: null,
  },
  actions: {
  	async login({ dispatch, commit }, form) {
	    // sign user in
	    const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
	    	.then(user => {
	        console.log(user)
	      }).catch(err => {
	        console.log(err)
	        commit('setLoginError', err.message)
	      })

	    // fetch user profile and set in state
	    dispatch('fetchUserProfile', user)
	  },


	  async fetchUserProfile({ commit, state }) {
		  // fetch user profile
		  const userProfile = await fb.usersCollection.doc(state.currentUser.uid).get()

		  // set user profile in state
		  commit('setUserProfile', userProfile.data())
		},
  	/**fetchUserProfile({ commit, state }) {
      fb.usersCollection.doc(state.currentUser.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          commit('setUserProfile', doc.data())
        } else {
        }
      })
    },**/
    signUserUp({ commit }, payload) {
      fb.auth.createUserWithEmailAndPassword(payload.email, payload.password).then(UserCredential => {
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
    signInWithFacebook({ commit }) {
      var provider = new fb.autho.FacebookAuthProvider()
		  fb.auth.signInWithPopup(provider).then(function(result) {
		  console.log(result.user)
		  var token = result.credential.accessToken;
		  fb.usersCollection.doc(result.user.uid).set({
		  	id: result.user.uid, 
        email: result.user.email, 
        photoURL: result.user.photoURL,
        displayName: result.user.displayName,
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
        commit('setFbError', err.message)
      })
    },
    clearAuth({ commit }) {
    	commit('setLoginError', null)
      commit('setFbError', null)
    },
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setLoginError', null)
      commit('setFbError', null)
      commit('setUserProfile', {})

      loginError
    },
  },
  mutations: {
  	setLoginError(state, val) {
      state.loginError = val
    },
  	setFbError(state, val) {
      state.fbError = val
    },
  	setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
})