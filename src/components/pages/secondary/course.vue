<template>
  <div class="pages" id="courses">
    <div class="bk-line"></div>

    <div class="container-fluid courses">
      <div class="row">
        <div class="col-xl-4 col-12">
          <div class="row" v-if="info">
            <div class="col-12 topBoxSp3">
              <div class="tt-b4 b_wow fadeInRight"></div>
              <p class="one-line b_wow slideInRight">{{info.title}}</p>
            </div>
            <div class="col-12 botBoxSp3 py-3">
              <div class="row" v-if="info.chapters.length != 0">
                <div class="col-6 col-xl-12">
                  <p>第{{thisCp}}章节：</p>
                  <p class="mb-3" v-clamp="3">{{ info.chapters[parseInt(thisCp)-1].chapterName }}</p>
                </div>
                <div class="col-6 col-xl-12">
                  <p>章节长度：</p>
                  <p>{{ info.chapters[parseInt(thisCp)-1].chpaterLength
                    ?(info.chapters[parseInt(thisCp)-1].chpaterLength + ' 分钟'):'N/A' }}</p>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col-6 col-xl-12">
                  <p>线下活动</p>
                </div>
                <div class="col-6 col-xl-12">
                  <br>
                  <p>价格：{{info.func[2].context}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8 bg-secondary col-12">
          <div class="row">
            <div v-if="!video_url" class="bkimg img95" v-bkimg="offLineCover" :class="!offLineCover?'loading':''">
            </div>
            <div v-else class="videoBox">
              <iframe id="the-video" :src="video_url" scrolling="no" frameborder="0" allowfullscreen="allowfullscreen"
                webkitallowfullscreen="true"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bk-line"></div>

    <div class="container-fluid" id="course-nav">
      <div class="row bk-wt seekBox sp2">
        <div class="col-xl-2 d-none d-xl-block">
        </div>
        <div class="col-12 col-xl-8">
          <h4 class="h3 w-75 lcont">
            简介
          </h4>
        </div>
        <div class="col-xl-1 bd-l2 d-none d-xl-block"></div>
        <div class="col-xl-1 bd-l2 d-none d-xl-block"></div>
      </div>
    </div>

    <div class="container-fluid courses">
      <div class="row">
        <div class="col-xl-2 bd-t2 bd-b2"></div>
        <div class="col-xl-8 bd-l2 bd-t2 bd-b2 bd-r1">
          <div class="contextPr">
            <div v-html="info.contextPr"></div>
            <ul v-if="info.chapters && info.chapters[0]">
              <li>章节目录</li>
              <li v-for="k in info.chapters" @click="cgVideo('this',k.orderNum)">
                <span class="poin link">
                  {{k.orderNum + '. ' + k.chapterName}}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="col-xl-1 bd-l1">
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
      <div v-if="moreInfo[0]">
        <div class="row bk-wt seekBox sp2">
          <div class="col-xl-2 d-none d-xl-block bd-b2">
          </div>
          <div class="col-12 col-xl-8 bd-b2">
            <h4 class="h3 w-75 lcont">
              推荐更多
            </h4>
          </div>
          <div class="col-xl-1 bd-l2 d-none d-xl-block"></div>
          <div class="col-xl-1 bd-l2 d-none d-xl-block"></div>
        </div>

        <div class="row bk-wt seekBox sp2">
          <div class="col-xl-2 d-none d-xl-block bd-b1 bd-r1">
          </div>
          <div class="col-12 col-xl-8">
            <div class="row psMg">
              <card0 v-for="(k,ind) in moreInfo" :key="ind" @click.native="cgVideo(k, 1)" class="col-6 col-xl-4 poin" :data="k" />
            </div>
          </div>
          <div class="col-xl-1 bd-l2 d-none bd-b1 d-xl-block"></div>
          <div class="col-xl-1 bd-l2 d-none bd-b1 d-xl-block"></div>
        </div>
      </div>

    </div>

    <div class="bk-line"></div>
    <div class="bk-line"></div>

  </div>
</template>

<script>
  import card0 from '@/components/temps/section-card-1.vue'

  export default {
    name: 'courses',
    data() {
      return {
        thisCp: 1,
        video_url: false,
        info: false,
        moreInfo: [false],
        offLineCover:false,
        // section_card_1,
        // section_card_2,
      }
    },
    components: {
      card0,
    },
    mounted() {
      var _this = this;
      var par = sessionStorage.getItem(this.$route.params.id);
      if (!par) {
        this.$router.replace('/courses/')
      } else {
        par = JSON.parse(par)
      }
      this.info = par;
      this.cgVideo(par, 1);
      var more_cous_info = sessionStorage.getItem('more_cous_info');
      if (more_cous_info) {
        more_cous_info = JSON.parse(more_cous_info);
      }
      for (var k = 0, len = more_cous_info.length, j = parseInt(len * Math.random()) - 1; k < 3; j = parseInt(len *
          Math.random()) - 1 - (++k)) {
        this.$set(this.moreInfo, k, more_cous_info.splice(j, 1)[0])
      }
    },
    methods: {
      scrollTT(val) {
        val = val || $('#course-nav').offset().top;
        console.log(val)
        $('body,html').animate({
          'scrollTop': val
        }, 600)
      },
      reDataCus(re, tag) {
        re = typeof re == "string" ? JSON.parse(re) : re;
        let courseUrl = JSON.parse(re.r).result.courseUrl
        console.log(courseUrl)
        this.$set(this, 'video_url', courseUrl)
        // this.video_url = courseUrl;
        console.log(re, tag)
      },
      cgVideo(par, no) {
        console.log(par)
        no = parseInt(no) || 1;
        if (par == 'this') {
          par = this.info
        } else {
          this.$set(this, 'info', par)
        }
        if (!par.chapters[0]) {
          this.offLineCover = par.img;
          this.$set(this, 'info', par)
          return
        }
        var ajaxPar = {
          company: "nxb",
          corpId: "nxb",
          courseId: par.courseId,
          chapterId: par.chapters[no - 1].chapterId,
          isRedirect: "yes"
        }
        this.thisCp = no;
        this.scrollTT("0")
        this.cc.ajax('/user/v82z105m680r970/pubget.php', {
          kxt: 2,
          par: stringPar(ajaxPar)
        }, this.reDataCus, 'cou_tp');
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

  function stringPar(par) {
    var re = []
    for (var k in par) {
      re.push(k + '=' + par[k])
    }
    // console.log(re.join('&'))
    return re.join('&')
  }

</script>

<style scoped>
  .videoBox {
    width: 100%;
    padding-top: 56.5%;
    position: relative;
  }

  #the-video {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100%;
  }

  .psMg {
    margin-top: -1px;
    margin-right: -16px;
    margin-left: -15px
  }

</style>
