
//state存放全局共用的数据

let defaultCity = '北京'
try {
  if(localStorage.city){
    defaultCity = localStorage.city
  }
}catch (e) {}

export default {
  city: defaultCity
}
