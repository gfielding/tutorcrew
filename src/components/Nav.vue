<template>
	<div class="navbar">
		<img class="navbar__logo" alt="Vue logo" src="../assets/logo.png" />
		<div class="navbar__menu">
			<img v-if="currentUser.photoURL" :src="currentUser.photoURL" class="navbar__menu-avatar" />
			<span v-if="userProfile.displayName" class="ml-2">{{userProfile.displayName}}</span>
		</div>
	</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser', 'userProfile']),
  },
}
</script>