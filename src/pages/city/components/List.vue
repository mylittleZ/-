<template>
	<div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item of hot" :key="item.id"
               @click="handleCityClick(item.name)">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item,key) of cities" :key="key"
       :ref="key">  <!--循环是一个对象，所以得把key值加括号里;ref取dom 操作dom-->
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="innerItem of item" :key="innerItem.id"
               @click="handleCityClick(innerItem.name)">
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
  name: "CityList",
  computed:{
    ...mapState(['city'])  //做映射 数据名字就不用写成$store.state.city直接写成city就ok
  },
  props:{                //子组件接收父组件传递过来的值
    hot:Array,
    cities:Object,
    letter:String
  },
  methods: {       //vuex共享数据的使用
    handleCityClick (city){
      this.$store.dispatch('changeC',city)
      this.$router.push('/')
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch:{         //监听letter的变化
    letter () {
      if(this.letter){
        const element = this.$refs[this.letter][0] //获取对应的元素，显示字母所在的区域
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .border-topbottom
    &:before
      border-color #ccc
    &:after
      border-color #ccc
  .border-bottom
    &:before
      border-color #ccc
 .list
   overflow hidden
   position absolute
   top:1.58rem
   left:0
   right 0
   bottom 0

  .title
    line-height .54rem
    background #eee
    padding-left .2rem
    color #666
    font-size .26rem
   .button-list
     overflow hidden  //子元素设置了浮动，父元素高度是靠子元素撑开的，所以需要清除浮动才能显示出来
     padding .1rem .6rem .1rem .1rem
     .button-wrapper
       float left
       width 33.33%
       .button
         border: .02rem solid #ccc
         margin:.1rem
         text-align center
         padding: .1rem 0
         border-radius .06rem
   .item-list
     .item
       line-height .76rem
       padding-left .2rem
</style>
