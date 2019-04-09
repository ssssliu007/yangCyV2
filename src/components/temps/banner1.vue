<template>
  <section :id="rdBannerId" class="main-slider" v-if="banner_data.diary[0]">
    <div class="row m-0">
      <div class="col-xl-8 p-0">
        <div id="swiper2" class="swiper-container" v-swiper="{
          autoplay:{
            delay: 8000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            },
          parallax : true,
          pagination: {
            el: '#swiper-pagination2',
            bulletClass: 'bsp-bullet',
            bulletActiveClass: 'bsp-bullet-active'
          },
          on: {
            slideChange: function(){changeBanner(this.activeIndex)},
          }
        }">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(k,no) in banner_data.diary" v-if="no <= 3">
              <div v-bkimg='k.img' class="bkimg img95"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4 bk-wt">
        <div class="row topBox">
          <div class="col-8 topBoxL b2_wow slideInLeft">
            <div class="btn-outline-secondary btn">查看详情</div>
          </div>
          <div class="col-4 topBoxR b2_wow slideInRight" data-wow-offset="10" data-wow-iteration="1">
            <div class="row">
              <div class="col align-self-end">
                <p>入驻时间</p>
                <p class="activeMsg_created_at"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="midBox row justify-content-start">
          <div class="col-auto" id="swiper-pagination2"></div>
        </div>
        <div class="botBox sp2 row">
          <div class="tt-b4 b2_wow fadeInRight" data-wow-delay="600ms"></div>
          <p class="one-line activeMsg_title b2_wow slideInRight"></p>
          <span v-clamp='3' class="activeMsg_body b2_wow slideInRight"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Bannert1',
    data() {
      return {
        b2_wow: null,
        swiper: true,
        isSetTime:false,
        rdBannerId: '',
      }
    },
    props: ['banner_data'],
    mounted() {
      let isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
      var rdBannerId;
      do {
        rdBannerId = 'rdBannerId_' + parseInt(Math.random() * 999);
      } while (document.querySelector(rdBannerId))
      this.rdBannerId = rdBannerId;
      this.$nextTick(()=>{
        this.changeBanner(0);
      })
      // let months = ['January','February','March','April','May', 'June', 'July', 'Aguest', 'September', 'October', 'November', 'December']
      // let tTime = new Date();
      // $('#tTime>.date').html(tTime.getDate()).css('font-size', $('.topBoxL').width()*.7)
      // let t_month = tTime.getMonth()
      // $('#tTime>.month').html( (t_month+1) + '月</br>' + months[t_month])
    },
    methods: {
      changeBanner(no) {
        console.log(this.banner_data.diary[no])
        this.b2_wow = null;
        this.banner_data.diary = this.banner_data.diary || this.banner_data.topDiary;
        for (var k in this.banner_data.diary[no]) {
          let tk = this.banner_data.diary[no],
            rdBannerId = '#' + this.rdBannerId;
          $(rdBannerId + " .activeMsg_" + k).html(tk[k])
        }
        this.b2_wow = this.cc.wow({
          boxClass: 'b2_wow', // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
        })
        this.b2_wow.init();
      }
    }
  }

</script>
