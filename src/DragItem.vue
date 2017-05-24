<template>
  <figure v-drag :data-image-name="image.name" class="shelfitem">
    <!-- add v-colorize to img if random colour is desired -->
    <img :style="{backgroundColor:bgColor.cssName}" :src="image.src" alt="" class="shelfitem__image">
    <figcaption class="shelfitem__description"><strong>{{bgColor.displayName}} {{image.name | fixName}}</strong><em>{{image.price | addCents}}</em></figcaption>
  </figure>
</template>

<script>
import $ from 'jquery';
import "jquery-ui/ui/widgets/draggable"; // this works directly, but need to include each widget separately
import "jquery-ui-touch-punch-c/jquery.ui.touch-punch.min.js";

  export default {
    data: function() {
      return {
        bgColor: {cssName:'transparent',displayName:''}
      }
    },
    props: ['image'],
    directives: {
      drag: {
        bind(el, binding, vnode) {
          // var vm = this;
          $(document).ready(function() {
            // $(el).draggable({ stack: "img",distance: 0 });
            $(el).draggable({ helper: "clone", opacity: 0.35, cursor: "move" });
          });
        }
      },
      colorize: {
        bind(el,binding,vnode) {
          let colors = [
            {cssName:"hotpink",displayName:"Pink"},
            {cssName:"red",displayName:"Red"},
            {cssName:"orange",displayName:"Orange"},
            {cssName:"yellow",displayName:"Yellow"},
            {cssName:"limegreen",displayName:"Green"},
            {cssName:"dodgerblue",displayName:"Blue"},
            {cssName:"purple",displayName:"Purple"},
            {cssName:"saddlebrown",displayName:"Brown"}
          ];
          let selectRandom = Math.floor(Math.random() * colors.length);
          let color = colors.slice(selectRandom,selectRandom+1);
          el.style.backgroundColor = color[0].cssName;
        }
      }
    }
    // uncomment the next part if you want random colours
    // ,
    // created(){
    //   let colors = [
    //       {cssName:"hotpink",displayName:"Pink"},
    //       {cssName:"red",displayName:"Red"},
    //       {cssName:"orange",displayName:"Orange"},
    //       {cssName:"yellow",displayName:"Yellow"},
    //       {cssName:"limegreen",displayName:"Green"},
    //       {cssName:"dodgerblue",displayName:"Blue"},
    //       {cssName:"purple",displayName:"Purple"},
    //       {cssName:"saddlebrown",displayName:"Brown"}
    //     ];
    //     let selectRandom = Math.floor(Math.random() * colors.length);
    //     let color = colors.slice(selectRandom,selectRandom+1);
    //     this.bgColor = color[0];
    // }
  }
</script>

<style lang="scss">
.shelfitem {
  display: inline-block;
  margin: 10px;
  position: relative;
  width: 150px; height: 150px;

  &__image {
    border: 3px solid #999;
    border-radius: 10px;
    width: 150px;height: 150px;
    object-fit: cover;
  }

  &__description {
    background-color: rgba(0,0,0,.4);
    border: 3px solid #999;
    border-top: 0;
    border-radius: 0 0 10px 10px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    position: absolute; left: 0;right: 0;bottom: 0;
    padding: 5px;
    text-shadow: 1px 1px 1px #000;
    text-transform: capitalize;
  }
}
</style>
