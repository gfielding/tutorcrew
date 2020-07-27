<template>
			<div class="card" data-aos="fade-up">
				
				
      <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>

      <div v-if="!showPasswordReset" :class="{ 'signup-form': !showLoginForm }">
        <form v-if="showLoginForm" @submit.prevent class="form">
          <div class="card__title">
            <h3>Welcome Back</h3>
          </div>
          <div class="card__text">
            <div class="form__group">
              <input class="form__input" v-model.trim="loginForm.email" type="email" placeholder="Email" id="email1" required/>
              <label class="form__label" for="email1">Email</label>
            </div>
            <div class="form__group">
              <input type="password" class="form__input" placeholder="Password" id="password1"v-model.trim="loginForm.password" required/>
              <label for="password" class="form__label">Password</label>
            </div>
            <div class="flex align-center justify-space-between pt-3 pb-5">
              <button class="btn btn__large btn__primary" @click.stop="onSigninFacebook()"><span class="mr-2">Continue with Facebook</span> <unicon name="facebook" fill="white" height="24" /></button>
              <div class="ml-3">
                <button class="btn btn__large" @click="login()">Log In</button>
              </div>
            </div>
            <div class="flex align-center justify-center mt-3">
              <p>
                <a @click="toggleForm()">Create an account</a> // 
                <a @click="togglePasswordReset()">Reset password</a>
              </p>
              
            </div>
          </div>
        </form>


        <form v-else @submit.prevent class="form">
          <div class="card__title">
            <h3>Get Started</h3>
          </div>
          <div class="card__text">
            <div class="form__group">
              <input class="form__input" v-model.trim="signupForm.name" type="text" placeholder="First & Last Name" id="name" required/>
              <label class="form__label" for="name">First & Last Name</label>
            </div>
            <div class="form__group">
              <input class="form__input" v-model.trim="signupForm.email" type="email" placeholder="Email" id="email2" required/>
              <label class="form__label" for="email2">Email</label>
            </div>
            <div class="form__group">
              <input type="password" class="form__input" placeholder="min 6 characters" id="password2"v-model.trim="signupForm.password" required/>
              <label for="password2" class="form__label">Password</label>
            </div>
            <transition name="fade">
              <div v-if="loginError" v-html="loginError" class="bold mt-3 mb-3">
              </div>
            </transition>
            <transition name="fade">
              <div v-if="fbError" v-html="fbError" class="bold mt-3 mb-3">
              </div>
            </transition>

            <div class="flex align-center justify-space-between pt-3 pb-5">
              <button class="btn btn__large btn__primary" @click.stop="onSigninFacebook()"><span class="mr-2">Continue with Facebook</span> <unicon name="facebook" fill="white" height="24" /></button>
              <div class="ml-3">
                <button class="btn btn__large" @click="signup()">Sign Up</button>
              </div>
            </div>


            <div class="flex align-center justify-center mt-3">
              <p>
                <a @click="toggleForm()">Already have an account?</a>
              </p>
              
            </div>
          </div>
        </form>
          
			</div>
		</div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/HomeNav.vue'
import PasswordReset from '@/components/PasswordReset.vue'
const fb = require('../firebaseConfig.js')

export default {
  name: 'Tutorsignup',
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      errors: [],
      showLoginForm: false,
      showPasswordReset: false
    }
  },
  
  computed: {
    ...mapState(['currentUser', 'userProfile', 'fbError', 'loginError']),
  },
  watch: {
  	currentUser (value) {
  		if (value) {
  			console.log(value)
  			this.$router.push('/dashboard')
  		}
  	}
  },
  components: {
  	Nav,
    PasswordReset
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signUserUp', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      })
    },
    onSigninFacebook () {
      this.$store.dispatch('signInWithFacebook')
    },
  },
  beforeDestroy () {
    this.$store.dispatch('clearAuth')
  }
}
</script>