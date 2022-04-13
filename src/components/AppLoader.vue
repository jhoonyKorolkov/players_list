<template>
	<div class="loader" v-if="loading">
		<div class="load">
			<div class="loader__item"></div>
			<div class="loader__item"></div>
			<div class="loader__item"></div>
			<div class="loader__item"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Loader',

	computed: {
		...mapGetters(['loading'])
	}
};
</script>

<style lang="stylus" scoped>

.loader
	&::before
		content: ''
		display block
		background: rgba(255,255,255 0.9)
		position fixed
		top 0
		left 0
		right 0
		bottom 0
		z-index: 6
		border-radius: 10px
	&	.load
			top 50%
			left 50%
			transform: translate(-50%, -50%)
			width 100px
			height 100px
			position fixed
			z-index 6
			@media mqPhone
				width 85px
				height 85px

		&__item
			border:0
			margin:0
			width:40px
			height:40px
			position:absolute
			border-radius:50%
			animation:spin 2s ease infinite
			@media mqPhone
				width 37%
				height 37%
			&:first-child
				background: #FD8C3B
				animation-delay: -1.5s
			&:nth-child(2)
				background: #BA775D
				animation-delay: -1s
			&:nth-child(3)
				background:#FFB649
				animation-delay: -0.5s
			&:last-child
				background:#ED6934

		@keyframes spin
			0%,100%
				transform:translate(0)
				-webkit-transform:translate(0)
			25%
				transform:translate(160%)
				-webkit-transform:translate(160%)
			50%
				transform:translate(160%, 160%)
				-webkit-transform:translate(160%, 160%)
			75%
				transform:translate(0, 160%)
				-webkit-transform:translate(0, 160%)
</style>
