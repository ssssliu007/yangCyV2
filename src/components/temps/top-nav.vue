<template>
  <div class="top-nav container-fluid">
    <div class="row" :class="isSeeking">
      <div class="col-auto">
        <div class="logo bkicon"></div>
      </div>
      <div class="col">
        <ul class="row nav-btn align-items-center justify-content-end">
          <router-link class="col-auto" tag="li" :to="{name:'home'}">首页</router-link>
          <router-link class="col-auto" tag="li" to="/activities/">线下活动</router-link>
          <router-link class="col-auto" tag="li" to="/courses/">在线课程</router-link>
          <router-link class="col-auto" tag="li" to="/tutors/">名师大牛</router-link>
          <router-link class="col-auto" tag="li" to="/companys/">企业服务</router-link>
          <router-link class="col-auto" tag="li" to="/join/">加入我们</router-link>
          <router-link class="col-auto" tag="li" to="/s3/">登录/注册</router-link>
          <!-- <router-link class="col-auto" tag="li" to="/login/">登录/注册</router-link> -->
        </ul>
      </div>
      <div class="col-auto top-seekBox">
        <div class="row h-100 align-items-center">
          <div class="col">
              <div class="input-group input-group-lg seekInput">
                <input type="text" class="form-control top-border" placeholder="" aria-label="" aria-describedby="basic-addon1">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary seek bkicon top-border" type="button" @click="toggleSeek()">
                  </button>
                </div>
              </div>
          </div>
          <!-- <div class="col-auto">
            <div class="seek bkicon" @click="toggleSeek()"></div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top_nav',
    data() {
      return {
        isSeeking: 'notSeeking',
      }
    },
    methods: {
      toggleSeek() {
        if (this.isSeeking =='notSeeking') {
          this.isSeeking = 'isSeeking';
        } else {
          this.isSeeking = 'notSeeking';
        }

      }
    }
  }

</script>

<style scoped>
  .top-nav {
    background-color: white;
  }

  .top-nav * {
    /* transition: all .8s; */
  }

  .logo {
    min-width: 150px;
    min-height: 85px;
    background-image: url('../../../static/img/logo.png');
  }

  .seek {
    max-width: 100px;
    min-width: 100px;
    height: 35px;
    /* min-height: 85px; */
    background-size: contain;
    background-image: url('../../../static/img/seek.svg');
  }

  .top-seekBox {
    padding: 0 20px;
    border-left: 2px solid #eeecec;
  }

  .nav-btn {
    height: 100%;
  }

  .nav-btn>li {
    color: #8c8c8c;
    line-height: 3em;
    font-size: 16px;
    padding: 0 1.5em;
    cursor: pointer;
  }

  .nav-btn>.router-link-active,
  .nav-btn>li:hover {
    color: #050505;
  }

  .nav-btn>.router-link-active::before,
  .nav-btn>li:hover::before {
    content: '';
    position: absolute;
    display: block;
    width: calc(100% - 2.6em);
    left: 1.3em;
    bottom: 0.1em;
    height: 4px;
    border-radius: 2px;
    background-color: #050505;
    animation: 300ms fadeInUp;
  }

  .isSeeking li.col-auto:not(.router-link-active) {
    max-width: 0;
    max-height: 0;
    overflow: hidden;
    padding: 0;
  }
  .isSeeking li.col-auto{
    opacity: 0;
    animation: 1800ms fadeIn forwards;
  }
  .top-border{
    border: 1px solid #ced4da
  }
  #app .notSeeking .form-control{
    max-width: 0;
    width: 0;
    /* max-height: 0; */
    padding: 0;
  }
  #app .notSeeking .top-border{
    border:none;
  }
  #app .notSeeking .btn:hover{
    background-color: transparent;
  }
  #app .notSeeking .btn:focus{
    outline: none;
    border-color: transparent;
    box-shadow: none;
    /* background-color: transparent; */
  }
  .notSeeking .nav-btn{
    opacity: 0;
    animation: 1800ms fadeIn forwards;
  }
  .isSeeking .top-seekBox{
    width: 50%;
    opacity: 0;
    animation: 1800ms fadeIn forwards;
  }
  .isSeeking .seek{
    background-size: 30%;
  }

</style>
