<template>
	<div class="popup">
		<!-- <div class="over"></div> -->
		<div class="popup__box">
			<div class="popup__name">
				{{ profile.name }}
			</div>
			<div class="popup__info">
				<template>
					<div class="popup__status" v-if="profile.online">
						Онлайн
					</div>
					<div class="popup__status" v-else>
						Офлайн
					</div>
				</template>
				<div class="popup__lvl">
					<svg-icon
						v-for="(star, i) in profile.level"
						:key="i"
						class-name="icon-star"
						icon-class="star"
					></svg-icon>
				</div>
				<button class="popup__close" type="button" @click="removeProfile">Закрыть</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'AppPopup',
	props: {
		profile: {
			type: Object
		}
	},
	methods: {
		...mapActions('players', ['removeProfile'])
	}
};
</script>

<style lang="stylus" scoped>
.popup
	&__box
		box-shadow: 1px 14px 14px 0px rgba(34, 60, 80, 0.2)
		position fixed
		top 50%
		left 50%
		transform translate(-50%, -50%)
		background #fff
		padding 10px 20px
		z-index 2
		width 400px
		padding 20px 20px 20px 40px
		display flex
		align-items center
		justify-content space-between
		z-index 10
	&__name
		font-size 48px
		display block
		margin-right 20px
		overflow hidden
		text-overflow ellipsis
	&__lvl
		margin-bottom 10px
		& .icon-star
			fill #daca08
	&__status
		margin-bottom 20px
		font-size 18px
	&__close
		padding 15px 30px
		background #e2e2e2
		border 1px solid #c6c6c6
		font-size 20px
</style>
