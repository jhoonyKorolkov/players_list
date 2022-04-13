import response from '@/api';

const players = {
	namespaced: true,
	state: {
		players: [],
		profile: null,
		open: false
	},
	getters: {
		players: ({ players }) => players,
		profile: ({ profile }) => profile
	},
	mutations: {
		SET_PLAYERS(state, value) {
			state.players = value;
		},
		ADD_PLAYER_PROFILE(state, value) {
			state.profile = value;
		},
		OPEN_PROFILE(state, value) {
			state.open = value;
		},
		CLOSE_PROFILE(state, value) {
			state.open = value;
		}
	},
	actions: {
		initApp: {
			root: true,
			handler({ commit, dispatch }) {
				//? тут запрос на сервер, обычно использую axios для работы с api
				dispatch('onLoading', true, { root: true });

				setTimeout(() => {
					commit('SET_PLAYERS', response.data);
					dispatch('onLoading', false, { root: true });
				}, 1000);
			}
		},

		addProfile({ commit }, value) {
			commit('ADD_PLAYER_PROFILE', value);
			commit('OPEN_PROFILE', true);
		},

		removeProfile({ commit }) {
			commit('ADD_PLAYER_PROFILE', null);
			commit('CLOSE_PROFILE', false);
		}
	}
};

export default players;
