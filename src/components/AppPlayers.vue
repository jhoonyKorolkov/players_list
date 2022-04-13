<template>
	<div class="tabel">
		<app-popup v-if="profile" :profile="profile" :close="(showProfile = false)"></app-popup>
		<div class="tabel__filter">
			<div class="tabel__filter-field">
				<label class="label" for="name">Имя</label>
				<input class="field" type="search" v-model="search" placeholder="Введите имя" id="name" />
			</div>
			<label class="tabel__filter-online">
				<input class="checkbox" type="checkbox" v-model="showOnline" />
				<div class="custom">Онлайн</div>
			</label>
			<button class="tabel__filter-action" @click="users = players">Показать всех</button>
		</div>
		<div class="tabel__box">
			<div class="tabel__hdr">
				<div class="tabel__hdr-item" v-for="(title, key) in titles" :key="key">
					<div class="tabel__hdr-name">{{ title.value }}</div>
					<div class="icon-wrap">
						<button class="tabel__hdr-sort" @click="sortUp(key)">
							<svg-icon
								class-name="arr-up"
								icon-class="arr_dwn"
								:class="{ active: title.active === 'check' }"
							></svg-icon>
						</button>
						<button class="tabel__hdr-sort" @click="sortDown(key)">
							<svg-icon
								class-name="arr-down"
								icon-class="arr_dwn"
								:class="{ active: title.active === 'remove' }"
							></svg-icon>
						</button>
					</div>
				</div>
			</div>

			<div class="tabel__list" v-if="playersList.length > 0">
				<div class="as" ref="list"></div>
				<app-player-info
					v-for="player in playersList"
					:key="player.id"
					:id="player.id"
					:active="activeItem"
					:name="player.name"
					:level="player.level"
					:online="player.online"
					@delete="removePlayer"
					@item-info="setItem"
				></app-player-info>
			</div>
			<div v-else>
				Такого пользователя нет
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppPlayerInfo from './AppPlayerInfo.vue';
import AppPopup from './AppPopup.vue';

export default {
	components: { AppPlayerInfo, AppPopup },
	name: 'appPlayers',

	data() {
		return {
			users: [],
			search: '',
			showOnline: false,
			reverse: false,
			activeItem: null,
			showProfile: true,
			titles: {
				id: {
					value: 'ID',
					active: null
				},
				name: {
					value: 'Имя',
					active: null
				},
				level: {
					value: 'Уровень',
					active: null
				},
				online: {
					value: 'Онлайн',
					active: null
				}
			}
		};
	},
	mounted() {
		window.addEventListener('click', this.closeModal);
	},

	methods: {
		...mapActions('players', ['removeProfile']),

		closeModal(e) {
			if (e.target.closest('.player')) return;

			this.activeItem = null;
		},

		setItem(key) {
			if (key === this.activeItem) return (this.activeItem = null);
			this.activeItem = key;
		},

		removePlayer(removeToId) {
			this.users = this.playersList.filter(item => item.id !== removeToId);
		},

		sortUp(title) {
			this.$refs.list.scrollIntoView({ block: 'center', behavior: 'smooth' });
			this.titles[title].active = 'check';

			Object.keys(this.titles).forEach(key => {
				this.reverse = true;
				this.sortInfo(key, title);
			});
		},

		sortDown(title) {
			this.$refs.list.scrollIntoView({ block: 'end', behavior: 'smooth' });
			this.titles[title].active = 'remove';

			Object.keys(this.titles).forEach(key => {
				this.reverse = false;
				this.sortInfo(key, title);
			});
		},

		sortInfo(key, title) {
			if (key === title && title !== 'name') {
				this.titles[key].start = !this.titles[key].start;
				this.sortOver(key);
			}
			if (key === title && title === 'name') {
				this.titles[key].start = !this.titles[key].start;
				this.sortName();
			}
		},

		sortOver(key) {
			this.users.sort((prev, next) =>
				this.reverse ? next[key] - prev[key] : prev[key] - next[key]
			);
		},

		sortName() {
			this.users.sort((prev, next) =>
				this.reverse ? prev.name.localeCompare(next.name) : next.name.localeCompare(prev.name)
			);
		}
	},

	computed: {
		...mapGetters('players', ['players', 'profile']),

		playersList() {
			if (this.search) {
				return this.users.filter(item => {
					return item.name.toLowerCase().includes(this.search.toLowerCase());
				});
			}

			if (this.showOnline) {
				return this.users.filter(item => {
					return item.online;
				});
			}
			return this.users;
		}
	},

	watch: {
		//? это что бы прелоадер показать, как будто ждем ответ с сервера. Можно было и без него обойтись :)
		players: {
			handler(val) {
				if (val.length !== 0) {
					this.users = this.players;
				}
			},
			immediate: true
		}
	},

	beforeMount() {
		window.removeEventListener('click', this.closeModal);
	}
};
</script>

<style lang="stylus" scoped>
.tabel
	width 800px
	margin 100px auto

	&__filter
		display flex
		align-items center
		margin-bottom 30px
		&-field
			display flex
			align-items center
			& .label
					margin-right 10px
			& .field
					width 100%
					max-width 320px
					border 1px solid #c6c6c6
					padding 10px 16px
		&-online
			& .checkbox
					display none
			& .custom
					display flex
					align-items center
					margin-left 20px
					margin-right 40px
					position relative
					cursor pointer
					&::after
						content ''
						display block
						width 16px
						height 16px
						border-radius 2px
						border 1px solid #c6c6c6
						margin-left 10px
					&::before
						content none
						background-image url(../assets/check.svg)
						width 16px
						height 16px
						background-position 0 0
						background-size cover
						position absolute
						right  0
			& .checkbox:checked + .custom::before
					content ''
		&-action
			padding 10px 16px
			background #e2e2e2
			border 1px solid #c6c6c6

	&__box
		background #e2e2e2
		padding 10px
		min-height 300px

	&__hdr
		display grid
		grid-template-columns repeat(4, 1fr)
		grid-gap 10px
		background #c6c6c6
		position sticky
		top 0
		z-index 2
		&-item
			border none
			background transparent
			text-align left
			padding 10px 0
			display flex
			align-items center
			&:first-child
				padding-left 10px
			& .icon-wrap
					display flex
					flex-direction column
					margin-left 10px
			& .arr-up
					transform rotate(180deg)
					&.active
						fill #fff
			& .arr-down
					&.active
						fill #fff
		&-sort
			display flex
			cursor pointer
			&:hover
				.svg-icon
					fill #fff

	&__list
		max-height 600px
		overflow-y auto
		min-height 300px
</style>
