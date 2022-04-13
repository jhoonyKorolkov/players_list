<template>
	<div>
		<div class="player" @click="checkPlayer(id)">
			<div class="player__info">
				<div class="player__info-item">{{ id }}</div>
				<div class="player__info-item">{{ name }}</div>
				<div class="player__info-item">
					<svg-icon
						v-for="(star, i) in level"
						:key="i"
						class-name="icon-star"
						icon-class="star"
					></svg-icon>
				</div>
				<div class="player__info-item">
					<div class="status" :class="{ isOnline: online }"></div>
				</div>
			</div>
			<div class="player__modal" v-if="id === active">
				<button class="player__modal-btn" @click="showProfile">Показать профиль</button>
				<button class="player__modal-btn" @click="$emit('delete', id)">Скрыть игрока</button>
			</div>
		</div>
		<!-- <app-popup v-if="show" :name="name" :level="level" :online="online" @close="show = false">
		</app-popup> -->
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import AppPopup from './AppPopup.vue';

export default {
	components: { AppPopup },
	name: 'AppPlayerInfo',
	props: {
		id: {
			type: Number
		},
		name: {
			type: String
		},
		level: {
			type: Number
		},
		online: {
			type: Boolean
		},
		active: {
			type: Number
		}
	},

	data() {
		return {
			modal: null
			// show: false
		};
	},

	methods: {
		...mapActions('players', ['addProfile']),

		checkPlayer(key) {
			this.$emit('item-info', key);
		},

		showProfile() {
			const data = {
				name: this.name,
				level: this.level,
				online: this.online
			};

			this.addProfile(data);
		}
	}
};
</script>

<style lang="stylus" scoped>

.player
	position relative
	background #d3d3d3
	margin-bottom 5px
	&__info
		display grid
		grid-template-columns repeat(4, 1fr)
		grid-gap 10px
		&-item
			border none
			background transparent
			padding 10px
			margin-bottom 2px
			text-align left
			word-break break-all
			&:last-child
				padding-left 15px
			& .status
					display block
					border-radius 50%
					width 20px
					height 20px
					background #989898
					&.isOnline
							background #58900c
			&:last-child
				margin 0
			& .icon-star
					fill #daca08
	&__modal
		position absolute
		left 0
		top 80%
		z-index 1
		display flex
		flex-direction column
		border-radius 10px
		box-shadow: 1px 19px 40px -5px rgba(0, 0, 0, 0.2)
		padding 5px
		overflow hidden
		background #e2e2e2
		border-radius 10px
		&-btn
			font-size 16px
			padding 15px 20px

			&:first-child
				border-bottom 1px solid #c6c6c6
</style>
