<template>
  <div class="lp0 line-block">
    <div class="row">
      <div class="col-xl-2 block end d-none d-xl-block">
        <div class="sect-tt" v-if="data.sub_head">
          <div class="date t2">{{data.sub_head}}</div>
          <div>{{data.sub_head2}}</div>
        </div>
      </div>
      <div class="col-xl-10 scontext lp0">
        <section class="section-list fadeInUp ease-out" :class="wowc" data-wow-delay="100ms" data-wow-duration="600ms">
          <div class="row cont align-items-start justify-content-between">
            <p>{{data.list_tt}}</p>
            <span class="col-auto btn btn-secondary ">查看更多</span>
          </div>
          <ul class="row list">
            <li v-for="(k,index) in data.diary" :key="k.ids" class="cont col-12 one-line"
              :class="wowc" v-if="ckCpy(index)">{{k.title}}</li>
          </ul>
        </section>
        <div class="d-block d-xl-none bk-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'section_list',
    data() {
      return {
        wowc: ''
      }
    },

    props: ['data'],

    mounted() {
      let isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true,
        _this = this;
      // this.data.diary.length = 5;
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
    methods: {
      ckCpy(no){
        if(this.data.type=='cpy'){
          if(no > 3 && no <9){
            return true
          }else{return false}
        }else{
          if(no < 5){
            return true
          }else{return false}
        }
      }
    }
  }

</script>

<style scoped>
  .section-list {
    padding-top: 50px;
    background: white;
    font-size: 26px;
    color: #6f6d6d;
    overflow: hidden;
  }

  .section-list .cont {
    padding-left: 35px;
    padding-right: 35px;
  }

  .section-list .list {
    padding-top: 126px;
  }

  .section-list .list>li {
    border-top: 2px solid #eeecec;
    line-height: 3.6;
    color: #8d8d8d;
    font-size: 16px;
    cursor: pointer;
  }

</style>
