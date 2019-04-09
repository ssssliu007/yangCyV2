<template>

  <div class="lp0 line-block" :class="tp_class">
      <div class="row">
        <section v-if="data" class="col p-0 scontext section-card fadeInUp ease-out" :class="wowc" data-wow-delay="100ms" data-wow-duration="600ms">
          <div class="row">
            <div class="col">
              <div class="bkimg img88" v-bkimg="data.img" >
                <!-- <img :src="" alt=""> -->
              </div>
            </div>
            <ul class="col-3 func" v-if="data.func && data.func[0]">
              <li class="row" v-for="(kk,ind) in data.func">
                <a :class="[kk.type=='btn'?'btn btn-outline-secondary':kk.type, kk.class]" :href="kk.link?kk.link:'javascript:void(0)'" :target="'block_' + kk.link">
                  {{kk.title}}<span v-if="kk.context">:</span>
                  <span v-if="kk.context" class="text-nowrap">{{kk.context}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="row bk-wt">
            <div class="col-12 cont"  v-if="sType != 'img_only'">
              <p><span v-if="data.title" class="pb4"></span>
                <span class="one-line">
                  {{data.title}}
                </span>
              </p>
              <span class="subtt">{{data.subtt}}</span>
              <span class="context" v-clamp="2">{{data.context}}</span>
            </div>
          </div>
        </section>
      </div>
      <div class="d-block d-xl-none bk-line"></div>
  </div>


</template>

<script>
import $clamp from 'clamp-js'
  export default {
    name: 'section_card_0',
    data() {
      return {
        wowc: '',
        tmonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October',
          'November', 'December'
        ],
        tp_class: 't0' + parseInt(Math.random()*10),
      }
    },

    props: ['data','sType'],

    mounted() {
      this.sType == 'img_only'
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
        // $('.clamp2').each(function(){
        //   $clamp(this, {clamp: 2})
        // })
        // $('.clamp3').each(function(){
        //   $clamp(this, {clamp: 2})
        // })
        setTimeout(()=>{
          ccWOW.init();
        },100)
        // ccWOW.sync($('.'+ _this.wowc));
        // console.log(ccWOW)
      })
    },
    methods: {
    },
    
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
    font-size: 12px;
    color: #7e7e7e;
    padding-left: .5em;
    padding-right: 0.5em;
    padding-top: .5em;
    /* padding: 1em; */
    /* padding-bottom: 1em; */
  }
  .bkimg.img65 {
    width: 100%;
    padding-top: 65.67%;
  }
  .text.sp2{
    color: #d95228;
  }
  .section-card{
    border: 1px solid #eeecec;
    overflow: hidden;
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
    width: 100%;
    padding: 25px 20px;
  }
  .cpy .section-card .cont{
    padding: 50px 20px;
  }
  .line-block:nth-of-type(2n) .section-card .cont,.courses .line-block .section-card .cont{
    padding: 25px 40px;
  }
  .section-card .cont p {
    position: relative;
    width: 100%;
    font-size: 20px;
    letter-spacing: 1px;
    color: #333333;
    margin-bottom: 20px;
  }
  .cpy .section-card .cont p,.cpy .section-card .subtt{
    font-size: 24px;
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
  .cpy .pb4{
    width: 1.7em;
    height: 5px;
    left: 0px;
    top: -13px;
    animation-name: fadeInRight;
  }
  .section-card .subtt {
    display: block;
    position: relative;
    /* margin-bottom: 20px; */
    line-height: 1.5;
    height: 4em;
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
