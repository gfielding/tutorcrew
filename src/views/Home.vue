<template>
  <div class="home">
    <div class="home__hero">
    	<div class="item">
				<h1>Tutorama</h1>
  		</div>
  		<div class="item flex justify-center flex-column">
  			<Auth />
  		</div>
	  </div>
	  <div id="more" class="home__more"></div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/HomeNav.vue'
import Auth from '@/components/Auth.vue'

export default {
  name: 'Home',
  computed: {
    ...mapState(['currentUser', 'userProfile']),
  },
  components: {
  	Nav,
  	Auth
  }
}
</script>
