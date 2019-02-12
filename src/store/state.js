
//state存放全局共用的数据

let defaultCity = '武汉'
try {
  if(localStorage.city){
    defaultCity = localStorage.city
  }
}catch (e) {}

export default {
  city: defaultCity
}
