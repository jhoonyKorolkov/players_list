<template>
	<div id="app">
		<app-loader></app-loader>
		<app-players></app-players>
	</div>
</template>

<script>
import AppLoader from './components/AppLoader.vue';

import { mapGetters, mapActions } from 'vuex';
import AppPlayers from './components/AppPlayers.vue';

export default {
	components: { AppLoader, AppPlayers },
	name: 'App',

	async created() {
		await this.initApp();
	},

	methods: {
		...mapActions(['initApp'])
	}
};
</script>

<style lang="stylus">
@font-face
  font-family 'Roboto'
  font-style normal
  font-weight 400
  src: local(''),
       url('./fonts/roboto-v29-latin_cyrillic-regular.woff2') format('woff2'),
       url('./fonts/roboto-v29-latin_cyrillic-regular.woff') format('woff')



#app
  font-family 'Roboto'
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #000
  margin-top 60px
	font-size 18px

*
	box-sizing border-box

button
	padding 0
	border: 0
	background: transparent
	cursor pointer
	font-size 18px
	&:focus
		outline: none
</style>
