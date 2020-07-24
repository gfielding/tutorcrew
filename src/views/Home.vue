<template>
  <div class="home">
    <Nav />
    <div class="home__video">
	    <div class="bg-video">
	      <video class="bg-video__content" autoplay muted loop>
	        <source src="https://firebasestorage.googleapis.com/v0/b/tutor-5e5ec.appspot.com/o/website_files%2Fcoverr-a-girl-is-studing-using-a-book-and-a-pc-6707.mp4?alt=media&token=a94fe678-c8ee-4c43-b65e-8e33c6851288" type="video/mp4">
          <source src="https://firebasestorage.googleapis.com/v0/b/tutor-5e5ec.appspot.com/o/website_files%2Fcoverr-a-girl-is-studing-using-a-book-and-a-pc-6707.webm?alt=media&token=454d6618-8c5d-4aef-94b3-117fc8220a76" type="video/webm">
	      </video>
	    </div>
	    <div class="jumbotron">
	    	<div class="item">
  				<h1>Tutorama</h1>
	  		</div>
	  		<div class="item flex justify-center flex-column">
	  			<router-link :to="{ name: 'Tutorsignup' }">
	  				<button class="btn btn__large">Become a Tutor</button>
	  			</router-link>
	  			<router-link :to="{ name: 'Signup' }">
	  				<button class="btn btn__large">Find a Tutor</button>
	  			</router-link>
	  		</div>
	  	</div>
	  	<a class="learn-more" v-scroll-to="'#element'">
	  		LEARN MORE
    		<unicon name="angle-down" fill="white"></unicon>
	  	</a>
	  </div>
	  <div id="element" style="height: 100vh;"></div>

  </div>
</template>

<script>
import Nav from '@/components/HomeNav.vue'

export default {
  name: 'Home',
  components: {
  	Nav
  }
}
</script>
