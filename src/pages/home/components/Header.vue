<template>
	<div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>输入景点/城市/游玩主题</div>
    <router-link to="/city">  <!--在路由中已经设置了/city会跳转到City组件-->
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
name: "HomeHeader",
  computed:{
    ...mapState(['city'])  //做映射 数据名字就不用写成$store.state.city直接写成city就ok
  }
  
}
</script>

<style lang="stylus" scoped>/*scoped表示这个样式只对当前的组件有效，不会对别的组件产生任何影响*/
@import "~styles/varibles.styl"  //在样式中引入样式要用 @ 符号,且使用波浪~前缀
                                 //styles是在webpack.base.conf.js中修改的路径别名简化代码
  .header
    display:flex
    line-height: $headerHeight
    background: $bgColor
    color:#fff
    .header-left
      width:.64rem
      float:left
      .back-icon
        text-align center
        font-size .4rem
    .header-input
      flex:1           /*另外两个规定宽度后，这个为1，则按剩余空间分配*/
      height .64rem
      line-height .64rem
      margin-top .12rem
      margin-left .2rem
      padding-left .2rem
      background:#fff
      border-radius:.1rem
      color #ccc
    .header-right
      min-width:1.04rem
      padding 0 .1rem
      float:right
      text-align:center
      color #fff
      .arrow-icon
        font-size .24rem
</style>
