import Vue from 'vue';
import App from './App.vue';

// import Vuex store
import {store} from './store/store.js';

// import gulp-generated image data
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
    this.$store.dispatch('importPricedItems', this.images);
  },
  render: h => h(App)
})
