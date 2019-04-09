<template>
  <section class="tsection" :class="section_data.type">
    <!-- 头图 -->
    <header v-if="section_data.type != 'cpy'" class="bkimg imgt" v-bkimg="htt0">
      <div class="hBox">
        <div class="htt" v-bkimg="htt1"></div>
        <div class="htt2" v-bkimg="htt2"></div>
      </div>
    </header>
    <header v-else>
      <div class="hBox">
        <div class="htt" v-bkimg="htt1"></div>
      </div>
      <banner1 v-if='section_data' :banner_data='section_data' />
    </header>
    <div class="d-block d-xl-none bk-line"></div>
    <div class="container-fluid line-type">
      <!-- 开头 -->
      <div class="row d-none d-xl-flex">
        <div class="col-xl-5 p-0">
          <div class="row subhead">
            <h3 class="one-line h3 col-xl-10 align-self-center offset-sm-1 text-center">{{section_data.subtt}}</h3>
          </div>
        </div>
        <div class="col-xl-2 to-next"></div>
      </div>
      <div class="row">
        <div class="col-xl-6 lp0 d-none d-xl-block line-block">
          <div class="row">
            <div class="col-xl-2 block start"></div>
            <div class="col-xl-10 lp0"></div>
          </div>
        </div>
        <div class="col-xl-6 lp0 d-none d-xl-block line-block">
          <div class="row">
            <div class="col-xl-2 d-none d-xl-block block start"></div>
            <div class="col-xl-10 lp0"></div>
          </div>
        </div>
      </div>

      <!-- 初始卡1卡2 -->
      <div class="row">
        <section class="col-xl-6" :is="card_1.type" :data="card_1.data"></section>
        <section class="col-xl-6" :is="card_2.type" :data="card_2.data"></section>
      </div>

      <!-- 更多card -->
      <div v-for="kk in more_list" v-if="kk[0]">
        <div class="row">
          <div class="col-xl-6 lp0 line-block">
            <div class="row">
              <div class="col-xl-2 block"></div>
              <div class="col-xl-10 lp0"></div>
            </div>
          </div>
          <div class="col-xl-6 lp0 line-block">
            <div class="row">
              <div class="col-xl-2 block"></div>
              <div class="col-xl-10 lp0"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <section class="col-xl-6" :is="type_more" :data="kk[0]"></section>
          <section class="col-xl-6" :is="type_more" :data="kk[1]"></section>
        </div>
      </div>

      <!-- 结尾 -->
      <div class="row d-none d-xl-flex">
        <div class="col-xl-6 lp0 line-block">
          <div class="row">
            <div class="col-xl-2 block end">
              <div></div>
            </div>
            <div class="col-xl-10 lp0"></div>
          </div>
        </div>
        <div class="col-xl-6 lp0 line-block">
          <div class="row">
            <div class="col-xl-2 block end">
              <div></div>
            </div>
            <div class="col-xl-10 lp0"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-5 col-5"></div>
        <div class="col-xl-2 col-2 to-more" @click="show_more(4)"></div>
      </div>

    </div>
  </section>
</template>

<script>
  import section_list from '@/components/temps/section-list.vue'
  // import section_card_0 from '@/components/temps/section-card-0.vue'
  // import section_card_1 from '@/components/temps/section-card-1.vue'
  // import section_card_2 from '@/components/temps/section-card-2.vue'
  import banner1 from '@/components/temps/banner1.vue'

  export default {
    name: 'tsection',
    data() {
      return {
        htt0: false,
        htt1: require('../../../static/img/' + this.section_data.type + '1.png'),
        htt2: require('../../../static/img/' + this.section_data.type + '2.png'),
        more_list: [],
        list_to_push: [],
        thisPage: 1,
        card_1: '',
        card_2: '',
      }
    },
    props: ['section_data', 'type_1', 'type_2', 'type_more'],
    components: {
      section_list,
      banner1,

    },
    mounted() {
      if (this.section_data.type != 'cpy') {
        this.htt0 = require('../../../static/img/' + this.section_data.type + '0.png')
      }
      this.card_1 = this.type_1;
      this.card_2 = this.type_2;
      this.list_to_push = JSON.parse(JSON.stringify(this.section_data.diary));
      this.list_to_push.shift();
      this.$nextTick(() => {
        $('.sect-tt>.date').css('font-size', $('.sect-tt>.date').width() * .6);
      })
    },
    methods: {
      show_more(no) {
        no = no / 2 || 2;

        for (var k = 0; k < no; k++) {
          let toPush = this.list_to_push.splice(0, 2)
          if (toPush.length < 2) {
            this.get_more(more)
          }
          if (toPush.length < 2) {
            throw 'noMore'
          }
          this.more_list.push(toPush)
        }

        // let toPush = [];
        // for(var k = 0; k<no; k++){
        //   if(!this.list_to_push[0]){
        //     this.get_more();
        //   }
        //   if(!this.list_to_push[0]){throw 'noMore'}
        //   toPush.push(this.list_to_push.shift())
        // }
        // Array.prototype.push.apply(this.more_list, toPush);
        this.$set(this, 'more_list', this.more_list)
        console.log(this.more_list)
        this.$nextTick(() => {
          $('.sect-tt>.date').css('font-size', $('.sect-tt>.date').width() * .6);
        })

      },
      get_more() {
        this.$emit('get_more', this.section_data.type, ++this.thisPage)
      }
    }
  }

</script>
<style>
  .bk-red {
    background-color: red;
  }

  .tsection {
    width: 100%;
  }

  .bkimg.imgt {
    position: relative;
    width: 100%;
    padding-top: 45%;
  }

  .cpy header {
    position: relative;
  }

  .hBox {
    top: 18%;
    position: absolute;
    width: 88%;
    margin-left: 6%;
    margin-right: 6%;
  }

  .cpy .hBox {
    top: 0;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 3% 6%;
    background-color: white;
    border-bottom: 2px solid #eeecec;
  }

  .htt {
    padding-top: 22%;
  }

  .join .htt {
    margin-top: 7.5%;
    margin-bottom: 3.5%;
    padding-top: 11%;
  }

  .htt2 {
    margin-top: 3%;
    padding-top: 5.5%;
  }

  .htt,
  .htt2 {
    background-position: 0% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .subhead {
    margin: 0;
    height: 100%;
    background: white;
  }

  .to-more {
    padding: 0;
    background-position: center;
    padding-top: 9%;
    background-size: 75%;
    background-repeat: no-repeat;
    background-image: url('../../../static/img/to-more.png');
    background-color: white;
    cursor: pointer;
  }

  .cpy .to-next {
    padding-top: 8%;
    background-image: url('../../../static/img/to-right.png');
    background-size: 13%;
  }

  .tsection .row {
    margin-left: 0;
    margin-right: 0;
  }

  .tsection .main-slider .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  #app .line-block>.row {
    height: 100%;
  }

  .line-type .lp0 {
    padding-left: 0;
    padding-right: 0;
  }

  #app .line-type {
    padding-left: 0;
    padding-right: 0;
  }

  .scontext {
    border-right: 2px solid #eeecec;
  }

  .home .line-block:nth-of-type(2n) .scontext {
    border-right: 0px solid #eeecec;
    border-left: 2px solid #eeecec;
    position: relative;
    top: -180px;
  }

  @media (max-width: 1200px) {
    .home .tsection .line-block .scontext {
      top: initial;
    }

  }

  .home .line-block:nth-of-type(2n + 1)>.row,
  .home .line-block:nth-of-type(2n + 1) .section-card>.row {
    flex-direction: row-reverse;
  }

  .line-block:nth-of-type(2n+1) .sect-tt {
    margin-top: 110%;
  }

  .line-block:nth-of-type(2n) .sect-tt {
    margin-bottom: 110%;
  }

  .line-block:nth-of-type(2n) .col-xl-2.block {
    border-right: 0px solid #eeecec;
    border-left: 1px solid #eeecec;
  }

  .col-xl-2.block {
    padding-left: 0;
    padding-right: 0;
    min-height: 140px;
    border-right: 1px solid #eeecec;
    background-color: white;
  }

  .col-xl-2.block.start {
    min-height: 240px;
    border-top: 2px solid #eeecec;
  }

  .col-xl-2.block.end>div {
    min-height: 140px;
    border-bottom: 2px solid #eeecec;
  }

  .sect-tt {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 100;
    text-align: center;
    color: #9c9c9c;
    padding-bottom: 20px;
  }

  .sect-tt>.date {
    color: #404040;
  }

  .sect-tt>.date.t2 {
    /* font-weight: 600; */
    zoom: .6;
  }

  .cpy .sect-tt>.date.t2 {
    zoom: .28;
  }

  .join .sect-tt>.date.t2 {
    zoom: .4;
  }

</style>
