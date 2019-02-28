export default {
  changeCt (state,city){ //state为所有的公用数据
    state.city = city
    try {
      localStorage.city = city
    }catch (e) {
    }
  }
}
