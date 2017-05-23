<template>
  <div class="container">
    <div class="row items">
      <appDragItem v-for="(image, index) in pricedArray"
          :image="image"
          :key="index"></appDragItem>
    </div>
    <appDropItem :addSelectedFn="addSelected">
      <div class="cart__item"
        @dblclick="selectedItems.splice(index,1)"
        v-for="(item, index) in selectedItems"
        :key="index">
          <strong>{{item.name | fixName}}</strong><em>{{item.price | addCents}}</em>
        </div>

      <div class="cart__total">Total: {{totalSale | addCents}}</div>
      <p>{{getImages}}</p>
    </appDropItem>
  </div>
</template>

<script>
import _ from 'lodash';

import {mapGetters} from 'vuex';

import DragItem from './DragItem.vue';
import DropItem from './DropItem.vue';
import {ImagesMixin} from './ImagesMixin.js';

export default {
  data () {
    return {
      selectedItems: [],
      pricedArray: {}
    }
  },
  mixins: [ImagesMixin], // add the images object to `data`
  methods: {
    addSelected(item){
      if (this.selectedItems.length < 10) {
        this.selectedItems.push(this.pricedArray[item]);
      } else {
        alert('Too many things!');
      }
    }
  },
  computed: {
    getImages(){
      return this.$store.state.pricedArray;
    },
    totalSale(){
      return _.sumBy(this.selectedItems, 'price');
    }
  },
  components: {
    appDragItem: DragItem,
    appDropItem: DropItem
  },
  created(){
    // this bit of magic restructures the images object to add random price and qty
    let obj = this.images.slides1;
    this.pricedArray = Object.assign(...Object.keys(obj).map(k => ({[k]: {
      name: k,
      src: obj[k],
      price: (Math.floor(Math.random()*15)+1),
      qty: (Math.ceil(Math.random()*3)+1)
    }})))
  }
}
</script>

<style lang="scss">
  *,*::before,*::after {
    box-sizing: border-box;
  }
  body {
    background: #ececec;
    margin:0;
    padding:0;
    font: 13px/1.5 helvetica, arial, san-serif;
  }
  .items {
    position: absolute;top: 0;right: 30%;bottom: 0;left: 0;
    z-index: 10;
  }
</style>
