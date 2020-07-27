<template>
  <div class="card">
     <div class="card__title">
      <h3>Reset Password</h3>
    </div>
    <div class="card__text">
      <div v-if="!showSuccess">
        <form @submit.prevent class="form">
          <div class="form__group">
            <input class="form__input" v-model.trim="email" type="email" placeholder="Email Address" id="email3"/>
            <label class="form__label" for="email3">Email</label>
          </div>
          <div class="flex align-center justify-space-between">
            <p><a @click="$emit('close')" class="close">Cancel</a></p>
            <div>
              <button @click="resetPassword()" class="btn btn__large">Reset</button>
            </div>
          </div>
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
      
      
    </div>
  </div>
</template>


<script>
const fb = require('../firebaseConfig.js')

export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      this.errorMsg = ''
      try {
        await fb.auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    }
  }
}
</script>