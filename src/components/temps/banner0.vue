<template>
  <section :id="rdBannerId" class="main-slider">
    <div class="row m-0" v-if="banner_data && banner_data.topDiary[0]">
      <div class="col-xl-4 bk-wt">
        <div class="row topBox">
          <div class="col-4 topBoxL animated delay-1s slow fadeIn">
            <span id="tTime" class="tTime">
              <div class="date"></div>
              <div class="month"></div>
            </span>
          </div>
          <div class="col-8 topBoxR b_wow slideInRight" data-wow-offset="10" data-wow-iteration="1">
            <div class="row">
              <div class="col align-self-end">
                <p class="activeMsg_subtt">开发时间</p>
                <p class="activeMsg_created_at"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="midBox row justify-content-end">
          <div class="col-auto" id="swiper-pagination"></div>
        </div>
        <div class="botBox row">
          <div class="tt-b4 b_wow fadeInRight" data-wow-duration="600ms" data-wow-delay="600ms"></div>
          <p class="one-line activeMsg_title b_wow slideInRight"></p>
          <span v-clamp='3' class="activeMsg_body b_wow slideInRight"></span>
        </div>
      </div>
      <div class="col-xl-8 p-0" v-if="swiper">
        <div id="swiper1" class="swiper-container" v-swiper="{
          autoplay: {
            delay: 7000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            },
          loop:true,
          parallax : true,
          pagination: {
            el: '#swiper-pagination',
            bulletClass: 'bsp-bullet',
            bulletActiveClass: 'bsp-bullet-active'
          },
          on: {
            slideChange: function(){changeBanner(this.activeIndex,this)},
          }
        }">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(k,index) in banner_data.topDiary" v-if="index <= 3">
              <div v-bkimg='k.cover' class="bkimg img95"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="row m-0">
      <div class="col-xl-4 bk-wt">
      </div>
      <div class="col-xl-8 p-0">
        <div class="swiper-container">
          <ul class="swiper-wrapper">
            <li class="swiper-slide">
              <div class="bkimg img95 loading"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Bannert0',
    data() {
      return {
        b_wow: null,
        swiper: true,
        isSetTime:false,
        rdBannerId:''
      }
    },
    props: ['banner_data'],
    mounted() {
      this.modalShow = false;
      let isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
      var rdBannerId;
      do{rdBannerId = 'rdBannerId_' + parseInt(Math.random()*999);}while(document.querySelector(rdBannerId))
      this.rdBannerId = rdBannerId;
    },
    methods: {
      changeBanner(no, swtag) {
        if(!this.isSetTime){
          this.isSetTime =true;
          setTtime()
        }
        this.b_wow = null;
        for (var k in this.banner_data.topDiary[no]) {
          let tk = this.banner_data.topDiary[no],rdBannerId = '#' + this.rdBannerId;
          $(rdBannerId + " .activeMsg_" + k).html(tk[k])
        }
        this.b_wow = this.cc.wow({
          boxClass: 'b_wow', // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
        })
        this.b_wow.init();
      }
    }
  }
  function setTtime() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October',
      'November', 'December'
    ],
    tTime = new Date(),
    t_month = tTime.getMonth();
    $('.tTime>.date').html(tTime.getDate()).css('font-size', $('.topBoxL').width() * .7)
    $('.tTime>.month').html((t_month + 1) + '月</br>' + months[t_month])
  }

</script>
