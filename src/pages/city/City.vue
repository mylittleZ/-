<template>
	<div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :cities="cities" :hot="hotCities" :letter="letter"></city-list>
    <city-alphabet :cities="cities" @change="handleLetterChange"></city-alphabet>
  </div>
</template>

<script>
  import axios from 'axios'
  import CityHeader from './components/Header'
  import CitySearch from './components/Search'
  import CityList from './components/List'
  import CityAlphabet from './components/Alphabet'
export default {
  name: "City",
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data (){    //父组件给子组件传值通过属性绑定的方式
    return {
      cities:{},
      hotCities:[],
      letter:''
    }
  },
  methods:{
    getCityInfo (){
      axios.get('/api/city.json')
        .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc(res) {
      console.log(res)
      res=res.data
      if (res.ret && res.data){
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handleLetterChange (letter) {
      //console.log(letter)         //接收到了Alphabet组件传递的值
      this.letter = letter      //将值传给list组件
    }
  },
  mounted (){
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
