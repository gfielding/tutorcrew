<template> 
  <div> 
    <h1>Signup succeeded</h1> 
    
    <hr> 
    <img v-if="currentUser.photoURL" :src="currentUser.photoURL" /> <br> 
    <p>{{currentUser.name}}</p> 
    <p>{{currentUser.email}}</p> 
    <p>{{currentUser.userId}}</p> 
    <hr> 
    <pre>{{currentUser}}</pre> 
    <button @click="logout">Log out</button> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
computed: {
    ...mapState(['currentUser', 'userProfile']),
  },
  methods: { 
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
      }).catch(err => {
        console.log(err)
      })
      this.$router.push('/')
    }
  },
};
</script>