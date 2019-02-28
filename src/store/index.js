import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,   //vuex：组件调用actions，actions调用mutations，mutations去改变公用数据state
  actions:{
    changeC(ctx,city){
       ctx.commit('changeCt',city)
    }
  },
  mutations
})
