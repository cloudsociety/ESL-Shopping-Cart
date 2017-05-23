<template>
  <!-- v-drop uses a function prop as callback because directives don't allow for proper `this` handling -->
  <div v-drop="addSelected" class="row cart">
    <appCartHeader></appCartHeader>

    <div class="cart__item"
      @dblclick="removeSelectedItem(index)"
      v-for="(item, index) in getAllSelectedItems"
      :key="index">
        <strong>{{item.name | fixName}}</strong><em>{{item.price | addCents}}</em>
      </div>

    <div class="cart__total">Total: {{totalSale | addCents}}</div>

    <slot></slot>
    <appCartFooter></appCartFooter>
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import "jquery-ui/ui/widgets/droppable"; // this works directly, but need to include each widget separately

import {mapGetters, mapActions} from 'vuex';

import CartHeader from './CartHeader.vue';
import CartFooter from './CartFooter.vue';

export default {
  methods: {
    ...mapActions(['addSelectedItem','removeSelectedItem']),
    addSelected(item){
      if (this.getSelectedItemLength < 10) {
        // this.selectedItems.push(this.$store.state.pricedArray[item]);
        this.addSelectedItem(item);
      } else {
        alert('Too many things!');
      }
    }
  },
  computed: mapGetters(['getAllSelectedItems','totalSale','getSelectedItemLength']),
  components: {
    appCartHeader: CartHeader,
    appCartFooter: CartFooter
  },
  directives: {
    drop: {
      bind(el, binding, vnode) {
        const fn = binding.value;
          // probably don't need to recheck if passed item is a function
          // but it feels like good practice
          if (typeof fn !== 'function') {
            throw(new Error('binding value was not a function!'));
          }
          $(document).ready(function() {
            $(el).droppable({
                tolerance:'pointer',
                hoverClass:"drop-here",
                drop: function(event, ui) {
                  fn($(ui.draggable).data('image-name'));
                }
              });
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .cart {
    background-color: #ccc;
    padding: 10px 0;
    position: absolute; top: 0;right: 0;bottom: 0;left: 70%;

    &__item {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      text-transform: capitalize;

      &:hover {
        background-color: rgba(0,0,0,.1);
      }
    }

    &__total {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 30px;
      padding: 10px 20px;
      text-align: right;
    }
    &.drop-here {
      background-color: #999;
    }
  }
</style>
