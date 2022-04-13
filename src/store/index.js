import Vue from 'vue';
import Vuex from 'vuex';

import global from './modules/global';
import players from './modules/players';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		global,
		players
	}
});

export default store;
