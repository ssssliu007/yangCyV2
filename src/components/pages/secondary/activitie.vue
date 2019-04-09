<template>
  <div class="sec-pages">
    <div class="col">
      <div class="bk-line"></div>
      <div class="bk-line"></div>
    </div>

    <div class="container-fluid bk-wt py-5 bd-b2">
      <div class="row pb-3">
        <div class="col-auto px-4"></div>
        <div class="col">
          <h4 class="h4 one-line pt-4 pl-3">
            <div class="tt-b4"></div>
            {{info.title}}
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-auto px-4"></div>
        <div class="col">
          <p class="mb-2">
            <span class="h4 pl-3"></span>
            发布时间：{{info.created_at}}
          </p>
          <p>
            <span class="h4 pl-3"></span>
            类型：{{ ( parseInt(info.type) == 4 ) ?"活动":"文章" }}
          </p>
        </div>
      </div>
      <div class="row py-5"></div>
    </div>
    <div class="container-fluid courses" v-if="info">
      <div class="row">
        <div class="col-xl-1"></div>
        <div class="col-xl-8 bd-l2 bd-r2">
          <div class="contextPr actps2">
            <div id="reap">
              <div class="reap-cover"></div>
              <div v-html="info.body"></div>
            </div>
            <div class="qrcodeBox py-3">
              <p>活动地址：{{info.addr_info}}</p>
              <p>活动起始报名时间：{{info.created_at}}</p>
              <p>活动时间：{{info.event_start_time + ' 至 ' + info.event_end_time}}</p>
              <div>
                <div class="row py-3">
                  <div class="col-4">
                    <div class="icon bgimg" v-bkimg="info.qr_url"></div>
                  </div>
                </div>
                <p>打开微信扫一扫上方二维码报名</p>
              </div>
              <div class="row pb-4 mb-4 justify-content-between linh-1">
                <div class="col">
                  <div class="row align-items-end">
                    <div class="col-auto">阅读次数：{{read}}</div>
                    <div class="col-auto">点赞</div>
                    <div @click="iconAct($event,like)" class="col-auto icon icon1em poin like-icon"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="row align-items-end">
                    <div class="col-auto">分享</div>
                    <div @click="iconAct($event)" class="col-auto icon icon1em poin wx-icon"></div>
                    <div @click="iconAct($event)" class="col-auto icon icon1em poin pyq-icon ml-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 p-5">
          <h5 class="h5 pt-3 pb-4">
            <p>
              <strong>
                阅读更多动态
              </strong>
            </p>
            <p class="c2">
              READ MORE
            </p>
          </h5>
          <ul class="moreList" v-if="more">
            <li>
              <h5 class="h5 text-center m-0">
                推荐
              </h5>
            </li>
            <li v-for="k in more" class="poin">
              <a :href="k.func[0].link" :target="'block_' + k.id">
                <h5 class="h5 one-line">
                  {{k.title}}
                </h5>
                <p class="c3 one-line">
                  发布时间：{{k.created_at}}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="bk-line"></div>
    </div>

  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import card0 from '@/components/temps/section-card-1.vue'
  import coursenav from '@/components/temps/type-nav.vue'
  import addmore from '@/components/temps/add-more.vue'

  export default {
    name: 'activities',
    data() {
      return {
        info: false,
        more: false,
        read: parseInt(Math.random() * 9900),
        diary_id: '',
      }
    },
    components: {
      card0,
    },
    mounted() {
      var diary_id = this.$route.params.id;
      if (!diary_id) {
        alert("很抱歉，您浏览的页面不存在！\n将自动帮您返回。")
        this.$router.replace('/activities')
      }
      this.diary_id = diary_id;
      this.cc.ajax('/diary/' + diary_id, {
        format: "json",
      }, this.reDataAct);
      this.cc.ajax('/diary/categroy/0', {
        format: "json",
        member_id: 22441,
        type: 4,
        page: this.thisPage
      }, this.reDataMore, 'more');
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      reDataAct(re) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        console.log(re);
        this.info = re;
      },
      reDataMore(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        let toRe = [];
        for (var k = 0; k < 5; k++) {
          let tk = re.diary[k];
          toRe[k] = {
            subtt: tk.addr_info,
            context: tk.event_start_time + ' 至 ' + tk.event_end_time.substring(5, 18),
            created_at: tk.event_sign_start_time,
            img: tk.img,
            title: tk.title,
            func: [{
              title: "立即参与",
              type: "btn",
              link: '#/activities/' + tk.id
            }],
            id: tk.id,
          }
        }
        this.$set(this, tag, toRe);
      },
      iconAct(e, callBack) {
        var elClass = e.target.classList;
        if (elClass.contains('act')) {
          elClass.remove('act')
          if (callBack)
            callBack(true)
        } else {
          elClass.add('act')
          if (callBack)
            callBack(false)
        }
      },
      like(isAct) {
        console.log(isAct)
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
  .actps2 {
    font-size: 1rem;
    line-height: 1.8em;
  }

  .moreList a {
    color: #464545;
    text-decoration: none;
  }

  .moreList>li {
    margin-bottom: 1rem;
    background-color: #f2efef;
    border-radius: 5px;
    padding: 1rem;
  }

  .moreList>li:hover {
    background-color: #f3f3f3;
  }

  .icon1em {
    opacity: .9;
  }

  .icon1em:hover {
    opacity: .7;
  }

  .icon1em:active {
    opacity: 1;
  }

  #reap {
    position: relative;
  }

  #reap>.reap-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
