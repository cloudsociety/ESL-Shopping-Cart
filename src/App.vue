<template>
  <div>
    <div class="shelf">
      <appDragItem v-for="(image, index) in getAllPricedItems"
          :image="image"
          :key="index"></appDragItem>
    </div>
    <appDropItem>
      <!-- <p>{{getImages}}</p> -->
    </appDropItem>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import DragItem from './DragItem.vue';
import DropItem from './DropItem.vue';

export default {
  computed: mapGetters(['getAllPricedItems']),
  components: {
    appDragItem: DragItem,
    appDropItem: DropItem
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
  .shelf {
    position: absolute;top: 0;right: 30%;bottom: 0;left: 0;
    z-index: 10;
  }
</style>
