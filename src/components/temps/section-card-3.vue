<template>

  <div class="col-xl-6 lp0 line-block">
    <div class="row" v-if="data">
      <div class="col-xl-2 block end">
        <div class="sect-tt">
          <div class="date">{{data.time.substring(8,10)}}</div>
          <div>{{tmonths[parseInt(data.time.substring(5,7))]}}</div>
        </div>
      </div>
      <div class="col-xl-10 scontext lp0">
        <section class="section-card fadeInUp" :class="wowc" data-wow-delay="300ms" data-wow-duration="600ms">
          <div class="row">
            <div class="col">
              <div class="bkimg img65" v-bkimg="data.img"></div>
            </div>
            <ul class="col-3 func" v-if="data.func && data.func[0]">
              <li class="row fadeInLeft" v-for="(kk,ind) in data.func" :class="wowc" :data-wow-delay="600 + ind*200 + 'ms'">
                <a :class="kk.type" :href="kk.link?kk.link:'javascript:void(0)'">
                  {{kk.name}}
                </a>
              </li>
            </ul>
          </div>
          <div class="row bk-wt">
            <div class="col cont">
              <p>0
                <span data-wow-duration="600ms" data-wow-delay="1.2s" :class="wowc" class="pb4 fadeInDown"></span>
                {{data.title}}
              </p>
              <span class="subtt">{{data.subtt}}</span>
              <span class="context">{{data.context}}</span>
            </div>
            <div class="col-3" v-if="data.func && data.func[0]"></div>
          </div>
        </section>
      </div>
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
      console.log(this.data)
      let isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true,
        _this = this;

      if (!window.wow_index) {
        window.wow_index = parseInt(Math.random().toString().substring(2, 8));
      } else {
        window.wow_index++
      }
      this.wowc = 'wow_' + window.wow_index;

      this.$nextTick(() => {
        _this.cc.wow({
          boxClass: _this.wowc
        }).init();
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

  .section-card .cont p {
    position: relative;
    font-size: 24px;
    letter-spacing: 1px;
    color: #333333;
    margin-bottom: 20px;
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

  .section-card .subtt {
    display: block;
    position: relative;
    margin-bottom: 20px;
    color: #919191;
  }

  .context {
    display: block;
    position: relative;
  }

</style>
