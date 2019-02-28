<template>
	<ul class="list">
    <li class="item" v-for="item of letters" :key="item"
    :ref="item"
    @click="handleLetterClick"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object
  },
  computed:{
    letters(){
      const letters=[]
      for (let i in this.cities){
        letters.push(i)
      }
      return letters
    }
  },
  data (){
    return {
      touchStatus:false,
      startY:0, //性能优化
      timer:null  //性能优化
    }
  },
  updated (){
    // 性能优化1：A的offsetTop这个值一直都是固定的，所以当页面数据被更新重现渲染的时候再来执行，而不是每次一滑动就执行
    this.startY=this.$refs['A'][0].offsetTop
  },
  methods:{
    handleLetterClick(e){
      //console.log(e.target.innerText)
      this.$emit('change',e.target.innerText)
      //为了将点击获取的字母传给兄弟组件list.vue所以得先向外触发change事件返给父组件（City.vue），再通过父组件传递给list.vue
    },
    handleTouchStart (){
      this.touchStatus=true
    },
    handleTouchMove (e){
      if (this.touchStatus){
        if(this.timer){
          clearTimeout(this.timer)  //若已经存在timer则清除掉
        }
        //性能优化2：函数节流方式，减小这个handleTouchMove函数的执行频率从而提高网页性能
        this.timer =setTimeout(() =>{ //否则创建timer
          // const startY = this.$refs['A'][0].offsetTop 放入生命周期钩子中执行
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY-this.startY) / 20)
          if (index >= 0 && index<this.letters.length){
            this.$emit('change',this.letters[index])
          }
        },16)
        //假设在16ms之间又一次做了手指滚动，则会把上一次执行的操作给清除掉重新执行你这次要做的事情

      }
    },
    handleTouchEnd (){
      this.touchStatus=false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .list
    display flex
    flex-direction column
    justify-content center
    position absolute
    right 0
    top:1.58rem
    width .4rem
    bottom 0
   .item
     text-align center
     line-height .4rem
     color $bgColor
</style>
