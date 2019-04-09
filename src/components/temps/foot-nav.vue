<template>
  <div class="foot-nav container-fluid py-5">
    <div class="row align-items-center justify-content-center pt-4">
      <div class="col-auto"><a href="/">首页</a></div>
      <div class="col-auto"><a href="/">关于我们</a></div>
      <div class="col-auto"><a href="/">新闻中心</a></div>
      <div class="col-auto"><a href="/">党建文明</a></div>
      <div class="col-auto"><a href="/">政策导航</a></div>
      <div class="col-auto"><a href="/">服务平台</a></div>
    </div>
    <div class="row flex-column pt-5 pb-4">
      <p class="col-auto text-center">
        Copyright © @2017 杨浦科技创业中心 All rights reserved.
      </p>
      <p class="col-auto text-center">
        沪ICP备16033906号-1 沪公网安备 31011002001105号
      </p>
      <p class="col-auto text-center">
        上海市 杨浦区 国权北路1600号
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'foot_nav',
    data() {
      return {}
    }
  }

</script>

<style scoped>
  .foot-nav {
    background-color: #1b1b1b;
  }
</style>
