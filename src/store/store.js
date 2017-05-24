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
    pricedArray: {},
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
    IMPORT_ITEMS: (state, payload) => {
      let pricedItems = Object.assign(...Object.keys(payload).map(k => ({[k]: {
        name: k,
        src: payload[k],
        price: (Math.floor(Math.random()*15)+1),
      // TODO: add a counter for qty available
      // qty: (Math.ceil(Math.random()*3)+1)
    }})));
      state.pricedArray = pricedItems;
    },
    ADD_ITEM: (state, payload) => {
      state.selectedItems.push(state.pricedArray[payload]);
    },
    REMOVE_ITEM: (state, payload) => {
      state.selectedItems.splice(payload,1);
    }
  },
  actions: {
    importPricedItems: ({commit}, payload) => {
      commit('IMPORT_ITEMS', payload);
    },
    addSelectedItem: ({commit}, payload) => {
      commit('ADD_ITEM', payload);
    },
    removeSelectedItem: ({commit}, payload) => {
      commit('REMOVE_ITEM', payload);
    }
  }
});
