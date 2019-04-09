<template>
  <div class="sec-pages">
    <div class="row">
      <div class="bk-line"></div>
      <div class="bk-line"></div>
    </div>

    <div class="container-fluid bk-wt bd-b2">
      <div class="row">
        <div class="col col-xl-3 pb-5">
          <h4 class="h4 one-line pt-4 pl-4 pb-5 fx">
            优秀导师<span class="bklong align-self-center"></span>{{info.name}}
          </h4>
        </div>
        <div class="col-xl-9 bd-l2">
        </div>
      </div>
    </div>
    <div class="container-fluid courses" v-if="info">
      <div class="row">
        <div class="col-xl-3 p-0">
          <div class="bkimg img65" v-bkimg="info.img"></div>
        </div>
        <div class="col-xl-9 bd-l2 bd-r2 pt-3 px-5">
          <h4 class="h4">
            {{info.name}}
          </h4>
          <h5 class="h5 py-3">
            {{info.title}}
          </h5>
          <p class="mb-3" v-clamp="3">简介：{{info.body}}</p>
          <p>{{info.ask_number}}人想咨询</p>
        </div>


      </div>
      <div class="row">
        <div class="col-2 to-next sp2">
        </div>
        <div class="col-10 bk-bd">
        </div>
      </div>
      <div class="row bk-wt seekBox sp2 bd-y-2" id="course-nav">
        <div class="col-xl-2 d-none d-xl-block">
        </div>
        <div class="col-12 col-xl-8">
          <h5 class="h5 w-75 lcont">
            视频课程
          </h5>
        </div>
      </div>
      <div class="row tut-vedio">

        <div class="col-xl-2 bd-t2 bd-b2"></div>
        <div class="col-xl-8 bd-l1 bd-r1">
          <div class="row mgbox-top">
            <card0 @click.native="toDetial(k)" class="col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in showList"
              :data="k" :key="no" />
          </div>
        </div>
        <div class="col-xl-1">
          <div class="row top-block">
            <div class="col-12 to-top-box" id="to-top-box">
              <div class="to-top ease-out" @click="scrollTT()" id="to-top">
                <p>TOP</p>
                <p>ENTRIES</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-1 bd-t2 bd-b2">
        </div>
      </div>
    </div>
    <addmore :type="am_type" v-on:func="showMore" />
    <div class="row"><div class="bk-line"></div></div>
    <div class="row"><div class="bk-line"></div></div>
    <div class="row"><div class="bk-line"></div></div>
  </div>
</template>

<script>
  import card0 from '@/components/temps/section-card-1.vue'
  import addmore from '@/components/temps/add-more.vue'

  export default {
    name: 'activities',
    data() {
      return {
        info: false,
        info_id: '',
        thisPage: 1,
        showList: [],
        videoList: [],
        am_type:'more'
      }
    },
    components: {
      card0,
      addmore
    },
    mounted() {
      var diary_id = this.$route.params.id;
      if (!diary_id) {
        alert("很抱歉，您浏览的页面不存在！\n将自动帮您返回。")
        this.$router.replace('/tutors/')
      }
      this.diary_id = diary_id;
      this.cc.ajax('/tutor/' + diary_id, {
        format: "json",
      }, this.reDataInfo, 'info');
      this.getIntData()
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      getIntData() {
        this.cc.ajax('/tutor/' + this.diary_id + '/video/', {
          format: "json",
          page: this.thisPage
        }, this.reDataAct, 'videoList');
      },
      showMore(list, no) {
        list = list || this.videoList;
        no = no || 6;
        if (list.length >= no) {
          var topushs = list.splice(0, no);
          for(var k=0;k<6;k++){
            this.showList.push(topushs[k])
          }
        } else {
          this.am_type = 'loading';
          this.getMore()
        }
      },
      getMore() {
        if (this.am_type == 'none') {
          return
        }
        this.thisPage++;
        this.getIntData()
      },
      reDataInfo(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        console.log(re)
        this.$set(this, tag, re);
      },
      reDataAct(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        console.log(re)
        if (this[tag] && this[tag][0]) {
          Array.prototype.unshift.apply(re, this[tag])
        }
        this.$set(this, tag, re);
        if (this[tag].length >= 6) {
          this.am_type = 'more';
          this.showMore(this[tag], 6)
        } else {
          this.showMore(this[tag], this[tag].length)
          this.am_type = 'none';
        }
      }

    },
    computed: {}
  }

  function reTag(tag, tagV, newV, type) {
    if (!type) {
      for (var k in tag) {
        tag[k][newV] = tag[k][tagV]
      }
    } else if (type == 'time') {
      for (var k in tag) {
        tag[k][newV] = tag[k][tagV[0]] + ' 至 ' + tag[k][tagV[1]].substring(5, 18)
      }
    }
  }

</script>

<style scoped>
</style>
