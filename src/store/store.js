import _ from 'lodash';

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
  getAllPricedItems: (state) => {
    return state.pricedArray;
  },
  getAllSelectedItems: (state) => {
    return state.selectedItems;
  },
  getSelectedItemLength: (state) => {
    return state.selectedItems.length;
  },
  totalSale: (state) => {
    return _.sumBy(state.selectedItems, 'price');
  }
},
mutations: {
  importPricedItems: (state, payload) => {
    state.pricedArray = payload;
  },
  addSelectedItem: (state, payload) => {
    state.selectedItems.push(state.pricedArray[payload]);
  },
  removeSelectedItem: (state, payload) => {
    state.selectedItems.splice(payload,1);
  }
},
actions: {
  importPricedItems: ({commit}, payload) => {
    commit('importPricedItems', payload);
  },
  addSelectedItem: ({commit}, payload) => {
    commit('addSelectedItem', payload);
  },
  removeSelectedItem: ({commit}, payload) => {
    commit('removeSelectedItem', payload);
  }
},
modules: {

}
});
