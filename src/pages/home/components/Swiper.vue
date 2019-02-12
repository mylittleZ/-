<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
<!--用v-if来解决显示的轮播停留在第四个的问题，一开始list是个空数组所以list.length=0,则v-if为false就还不会创建swiper这个组件-->
      <!-- 利用循环来遍历轮播图图片-->
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props:{
    list:Array
  },
  data(){
    return{
      swiperOption:{        //与swiper组件数据绑定,传配置项
        pagination:'.swiper-pagination', //轮播图底下的小点
        loop:true          //让插件支持循环轮播
      }
      
    }
  },
  computed:{
    showSwiper (){
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active  //让wrapper下的所有...bullet-active都有以下样式，不受scoped的限制了
    background #fff
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 31.25%    //图片的高除以宽=31.25%，高度相对于它的高度会自动撑开31.25%
    // 这样图片还没加载出来的时候会预留给图片位置，下一级元素不会跑到图片的位置上，这样就防止了加载时抖动
    .swiper-img
      width 100%
</style>
