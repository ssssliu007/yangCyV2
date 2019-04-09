<template>

  <div class="lp0 line-block">
    <div class="row" v-if="data">
      <div class="col-xl-2 block end d-none d-xl-block">
        <div class="sect-tt" v-if="!data.sub_head">
          <div class="date">{{data.created_at.substring(8,10)}}</div>
          <div>{{tmonths[parseInt(data.created_at.substring(5,7))]}}</div>
        </div>
        <div class="sect-tt" v-else>
          <div class="date t2">{{data.sub_head}}</div>
          <div>{{data.sub_head2}}</div>
        </div>
      </div>
      <div class="col-xl-10 scontext lp0">
        <section class="section-card fadeInUp ease-out" :class="wowc" data-wow-delay="100ms" data-wow-duration="600ms">
          <div class="row">
            <div class="col">
              <div class="card-img">
                <img :src="data.img" alt="">
              </div>
            </div>
            <ul class="col-3 func" v-if="data.func && data.func[0]">
              <li class="row" v-for="(kk,ind) in data.func">
                <a :class="[kk.type=='btn'?'btn btn-outline-secondary':kk.type, kk.class]" :href="kk.link?kk.link:'javascript:void(0)'" :target="'block_' + data.id">
                  {{kk.title}}<span v-if="kk.context">:</span>
                  <span v-if="kk.context" class="text-nowrap">{{kk.context}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="row bk-wt">
            <div class="col cont">
              <p>
                <span v-if="data.title" class="pb4"></span>
                {{data.title}}
              </p>
              <span class="subtt">{{data.subtt}}</span>
              <span class="context" v-clamp="3">{{data.context}}</span>
            </div>
            <div class="col-3" v-if="data.func && data.func[0]"></div>
          </div>
        </section>
      </div>
      <div class="d-block d-xl-none bk-line"></div>
    </div>
  </div>


</template>

<script>
  export default {
    name: 'section_card_0',
    data() {
      return {
        wowc: '',
        tmonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October',
          'November', 'December'
        ],
      }
    },

    props: ['data'],

    mounted() {
      // console.log(this.data)
      let isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true,
        _this = this;
      if (!window.wow_index) {
        window.wow_index = parseInt(Math.random().toString().substring(2, 8));
      } else {
        window.wow_index++
      }
      this.wowc = 'wow_' + window.wow_index;
      this.$nextTick(() => {
        let ccWOW = _this.cc.wow({
          boxClass: _this.wowc
        });
        ccWOW.init();
        // ccWOW.sync($('.'+ _this.wowc));
        // console.log(ccWOW)
      })
    },
    methods: {}
  }

</script>

<style scoped>
  .btn {
    display: block;
    margin: 25px auto;
  }

  .func {
    background-color: #f7f6f6;
  }
  .func .text{
    text-decoration: none;
    cursor: initial;
    line-height: 2;
    font-size: 16px;
    color: #7e7e7e;
    /* padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em; */
    padding: 1em;
  }
  .bkimg.img65 {
    width: 100%;
    padding-top: 65.67%;
  }
  .text.sp2{
    color: #d95228;
  }
  .section-card .row {
    margin-left: 0;
    margin-right: 0;
  }

  .section-card .col,
  .section-card .col-3 {
    padding-left: 0;
    padding-right: 0;
  }

  .section-card .cont {
    position: relative;
    padding: 25px 20px;
  }
  .cpy .section-card .cont{
    padding: 50px 20px;
  }
  .line-block:nth-of-type(2n) .section-card .cont {
    padding: 25px 40px;
  }
  .section-card .cont p {
    position: relative;
    font-size: 24px;
    letter-spacing: 1px;
    color: #333333;
    margin-bottom: 20px;
  }
  .cpy .section-card .cont p,.cpy .section-card .subtt{
    font-size: 28px;
    margin-bottom: 0;
  }
  .pb4 {
    display: block;
    position: absolute;
    width: 5px;
    height: 1em;
    left: -13px;
    top: 0.3em;
    background-color: #333333;
    border-radius: 2px;
  }
  .cpy .pb4,.tut-vedio .pb4{
    width: 1.7em;
    height: 5px;
    left: 0px;
    top: -13px;
    animation-name: fadeInRight;
  }
  .section-card .subtt {
    display: block;
    position: relative;
    margin-bottom: 20px;
    color: #919191;
  }
  .card-img>img{
    width: 100%;
    height: auto;
  }
  .context {
    display: block;
    position: relative;
  }
</style>
