const global = {
	state: {
		loading: false
	},
	getters: {
		loading: ({ loading }) => loading
	},
	mutations: {
		IS_LOADING(state, value) {
			state.loading = value;
		}
	},
	actions: {
		onLoading({ commit }, value) {
			commit('IS_LOADING', value);
		}
	}
};

export default global;
