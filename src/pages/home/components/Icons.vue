<template>
	<div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl" alt="">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  props:{
    list:Array
  },
  data (){
    return{
  swiperOption:{
    autoplay:false       //不自动轮播
  }
    }
  },
  computed:{
    //把一维的9条数组拆分成一个二维的数组，根据数据项不同来自动生成页码
    pages (){
      const pages = []
      this.list.forEach((item,index) => {
        const page = Math.floor(index/8)
        if(!pages[page]){ //若算出来页码数不存在则创造一个新页码
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages;
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  @import "~styles/mixins.styl"
  .icons >>> .swiper-container
    height 0
    padding-bottom 50%  //指往下撑的高度是父元素宽度的百分之50
  .icons
   margin-top .1rem
   .icon
     position relative
     overflow hidden
     float left
     width 25%
     height 0
     padding-bottom 25%
     .icon-img
       position absolute
       top:0
       left:0
       right 0
       bottom .44rem    //给p标签留的位置
       box-sizing border-box
       padding .1rem
       .icon-img-content
         display block
         margin 0 auto   //让图片自动居中
         height 100%
      .icon-desc
        position absolute
        line-height .44rem
        text-align center
        height .44rem
        left:0
        right 0
        bottom 0
        color $darkTextColor
        ellipsis()
</style>
