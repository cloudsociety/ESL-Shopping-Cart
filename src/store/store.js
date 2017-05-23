// import Vue and Vuex
import Vue from 'vue';
import Vuex from 'vuex';

// tell Vue to use Vuex
Vue.use(Vuex);

// create the store
export const store = new Vuex.Store({
  state: {
    selectedItems: [],
    pricedArray: {}
},
getters: {

},
mutations: {
  importPricedItems: (state, payload) => {
    state.pricedArray = payload;
  }
},
actions: {
  importPricedItems: ({commit}, payload) => {
    commit('importPricedItems', payload);
  }
},
modules: {

}
});
