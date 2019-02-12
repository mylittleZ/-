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
      startY:0,
      timer:null
    }
  },
  updated (){           //性能优化
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
        }   //函数节流方式，减小这个handleTouchMove函数的执行频率从而提高网页性能
        this.timer =setTimeout(() =>{
          // const startY = this.$refs['A'][0].offsetTop
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY-this.startY) / 20)
          if (index >= 0 && index<this.letters.length){
            this.$emit('change',this.letters[index])
          }
        },16)
       
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
