<template> 
  <div>
    <Nav />
    <div class="dashboard">
      <transition name="fade">
        <WelcomeWizard v-if="currentUser" />
      </transition>
      <h1>Signup succeeded</h1> 
        
      
      <hr> 
      <img v-if="currentUser.photoURL" :src="currentUser.photoURL" /> <br> 
      <p>{{currentUser.name}}</p> 
      <p>{{currentUser.email}}</p> 
      <p>{{currentUser.userId}}</p> 
      <hr> 
      <pre>{{currentUser}}</pre> 
      <button class="btn" @click="logout">Log out</button> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/Nav.vue'
import WelcomeWizard from '@/components/WelcomeWizard.vue'
const fb = require('../firebaseConfig.js')

export default {
  computed: {
    ...mapState(['currentUser', 'userProfile']),
  },
  components: {
    Nav,
    WelcomeWizard
  },
  methods: { 
    logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>