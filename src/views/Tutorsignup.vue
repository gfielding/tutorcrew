<template>
	<div class="tutor-signup">
		<Nav />
		<div class="tutor-signup__box">
			<div class="item">
  		</div>
			<div class="item flex justify-center flex-column">
				<div class="card" data-aos="fade-up">
					<div class="card__title">
						<h3>Become a Tutor</h3>
					</div>
					<div class="card__text">
						<form v-on:submit.prevent="onSignup" class="form">
							<div class="form__group">
								<input type="email" class="form__input" placeholder="Email" id="email" v-model="email" required />
								<label for="email" class="form__label">Email Address</label>
							</div>
							<div class="form__group">
								<input type="password" class="form__input" placeholder="Password" id="password" v-model="password" required/>
								<label for="password" class="form__label">Password</label>
							</div>
							<div class="errorText ml-3" v-if="errors.length > 0">
								{{errors[0]}}
							</div>
							<div class="text-right">
								<button class="btn btn__primary" :disabled="(!email || password.length < 6)" type="submit">Next</button>
							</div>
							<div><button class="btn mb-4" @click.prevent="onSigninGoogle">Google Login</button></div>
							<div><button class="btn" @click.prevent="onSigninFacebook">Facebook Login</button></div>
						</form>
					</div>
					<router-link :to="{ name: 'Signup' }">Already have an account?
	  			</router-link>
				</div>
  			
  		</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/HomeNav.vue'
const fb = require('../firebaseConfig.js')

export default {
  name: 'Tutorsignup',
  data: () => ({
		email: '',
    password: '',
    errors: [],
    performingRequest: false,
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be 6 or more characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
  }),
  computed: {
    ...mapState(['currentUser', 'userProfile']),
  },
  watch: {
  	currentUser (value) {
  		if (value) {
  			console.log(value)
  			this.$router.replace('/dashboard')
  		}
  	}
  },
  components: {
  	Nav
  },
  methods: {
  	onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onSigninFacebook () {
      this.$store.dispatch('signInWithFacebook')
    },
  },
}
</script>