import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index.js'
import AOS from "aos"
import "aos/dist/aos.css"
import VueScrollTo from 'vue-scrollto'
import Unicon from 'vue-unicons'
import { uniFacebook, uniArrowLeft, uniAngleDown } from 'vue-unicons/src/icons'
import './sass/main.scss'
const fb = require('./firebaseConfig.js')

Unicon.add([uniFacebook, uniArrowLeft, uniAngleDown])
Vue.use(Unicon, {
  height: 24,
  width: 24
})

Vue.use(VueScrollTo, {
   duration: 400,
   easing: "ease",
   offset: 0,
   force: true,
   cancelable: true,
   onStart: false,
   onDone: false,
   onCancel: false,
   x: false,
   y: true
})

Vue.config.productionTip = false

Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

Vue.filter('lowercase', function (value) {
  return value.toLowerCase()
})

Vue.filter('readMore', function (text, length, suffix) {
  return text.substring(0, length) + suffix;
})

fb.auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
  } else {
  }
});


let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      created() {
    		AOS.init({ 
    			easing: 'ease-in',
    			offset: 0,
      		duration: 300,
    		});
    	},
      render: h => h(App)
    })
  }
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})