import Vue from 'vue';
import App from './App.vue';

// import Vuex store
import {store} from './store/store.js';
import {ImagesMixin} from './ImagesMixin.js';


Vue.filter('fixName', (value) => {
  return value.split(".")[0].replace('-', ' ');
});
Vue.filter('addCents', (value) => {
  return value.toFixed(2);
})


new Vue({
  el: '#app',
  store, // add store to Vue instance (can use ES6 syntax)
  mixins: [ImagesMixin], // add the images object to `data`
  created(){
    // this bit of magic restructures the images object to add random price and qty
    let obj = this.images.slides1;
    let pricedItems = Object.assign(...Object.keys(obj).map(k => ({[k]: {
      name: k,
      src: obj[k],
      price: (Math.floor(Math.random()*15)+1),
      qty: (Math.ceil(Math.random()*3)+1)
    }})));
    this.$store.dispatch('importPricedItems', pricedItems);
  },
  render: h => h(App)
})
