<template>
  <div id="app">
  <!--除了detail这个组件以外别的页面都会被缓存，只有detail不会被缓存那么每次进入页面mounted这个钩子就会被重新执行-->
    <keep-alive exclude="Detail">
      <!--指路由的内容被加载过一次之后就把路由中的内容放到内存之中，不会重新再发送ajax请求了-->
      <router-view/>
      <!--下一次再进路由的时候不需要重新渲染这个组件/重新执行钩子函数，只需要从内存里取出来以前显示的内容就可以了-->
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
