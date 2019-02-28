<template>
  <div>
	<home-header></home-header><!--在模板里vue会自动把大写字母和小写字母做上关联，就是对应Header-->
  <home-swiper :list="swiperList"></home-swiper>
  <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data(){
    return{
      lastCity:'',
      swiperList:[],
      iconList: [],
      recommendList:[],
      weekendList:[]
    }
  },
  computed:{
    ...mapState(['city'])
  },
  methods:{
    getHomeInfo(){
      axios.get('/api/index.json?city=' + this.city)        //请求url获取ajax数据
        .then(this.getHomeIofoSucc)   //axios返回的结果是一个promise对象所以可以用then
    },
    getHomeIofoSucc (res){
      res = res.data
      if (res.ret && res.data){
        const data = res.data
        this.swiperList=data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }

    }
  },
  mounted () {
    this.lastCity = this.city    //lastcity临时缓冲变量
    this.getHomeInfo()
  },
  activated (){
    //使用keep-alive时会多出来一个生命周期函数，当页面重新被显示的时候activated就会被执行
    // 因为不同的城市显示的页面需要不一样，所以要重新请求ajax
    if (this.lastCity !== this.city){
      // 判断前后两次显示的城市是否一样，不一样的话就去重新请求一次ajax
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import 'swiper/dist/css/swiper.css'
</style>
