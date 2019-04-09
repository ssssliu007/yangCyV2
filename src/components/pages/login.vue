<template>
  <div class="pages" id="courses">
    <banner v-if='banner_data' :banner_data='banner_data' class="pt-5 mt-4" />

    <div class="bk-line"></div>

    <coursenav :data="nav_data" id="course-nav" v-on:change_tp="change_list" />

    <div class="container-fluid courses">
      <div class="row" v-if="cou_tp">
        <div class="col-xl-2"></div>
        <div class="col-xl-8">
          <div class="row mgbox-top">
            <card0 class="col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in cou_tp.diary" :data="k" :key="no" />
          </div>
        </div>
        <div class="col-xl-1">
          <div class="row top-block">
            <div class="col-12 to-top-box" @click="scrollTT()" id="to-top-box">
              <div class="to-top ease-out" id="to-top">
                <p>TOP</p>
                <p>ENTRIES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bk-line"></div>
    <div class="bk-line"></div>
    <div class="bk-line"></div>

  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import card0 from '@/components/temps/section-card-1.vue'
  import coursenav from '@/components/temps/type-nav.vue'

  export default {
    name: 'activities',
    data() {
      return {
        nav_data: {
          list: [{
            title: "产品创客",
            type: 't01'
          },{
            title: "平面设计",
            type: 't02'
          },{
            title: "办公协作",
            type: 't03'
          },{
            title: "企业网站",
            type: 't04'
          },{
            title: "法律服务",
            type: 't05'
          },{
            title: "网络安全",
            type: 't06'
          },{
            title: "企业建设",
            type: 't07'
          },{
            title: "营销宣传",
            type: 't08'
          },{
            title: "财务管理",
            type: 't09'
          },]
        },
        list_tt: {
          act: '热门活动',
          cou: '热门课程',
          tut: '优秀导师',
          cpy: '入驻企业'
        },
        banner_data: false,
        act: false,
        cou: false,
        cou_tp: false,
        tut: false,
        join: false,
        cpy: false,
        // section_list,
        card0,
        // section_card_1,
        // section_card_2,
      }
    },
    components: {
      // tsection,
      banner,
      coursenav,
      card0
    },
    mounted() {
      var _this = this;
      console.log('e')
      // this.cc.ajax('/diary/super/news/list/22441', {
      //   format: 'json'
      // }, this.reData, 'banner_data')
      // this.cc.ajax('/diary/categroy/0', {
      //   format: "json",
      //   member_id: 22441,
      //   type: 4
      // }, this.reDataAct, 'act');
      this.cc.ajax('/user/v82z105m680r970/pubget.php', {
        kxt: 1,
        par: 'corpId=nxb&begin=2016-06-25'
      }, this.reDataCus, 'cou_tp');
      this.cc.ajax('/section/tut', '', this.reData, 'tut');
      this.cc.ajax('/section/join', '', this.reData, 'join');
      this.cc.ajax('/section/cpy', '', this.reData, 'cpy');
      // this.change_list('all');
      // this.cou = this.cou_tp;
      // this.$set(this, 'cou_tp', JSON.parse(JSON.stringify(this.cou)));
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      reData(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        re.type = tag;
        re.list_tt = this.list_tt[tag];

        switch (tag) {
          case 'act':

            break;

          default:
            reTag(re.diary, 'body', 'context')
            break;
        }

        this[tag] = re;

      },
      reDataCus(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        if (!re.r) {
          return
        }
        let result = typeof re.r == 'string' ? JSON.parse(re.r) : re.r;
        let toRe = [];

        for (var k in result.result) {
          let tk = result.result[k];
          toRe[k] = {
            title: tk.courseName,
            context: tk.description.replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, ''),
            subtt: '章节长度：' + tk.chapters.length,
            img: tk.image,
            sub_head: ' ',
            sub_head2: ' ',
            func: [{
                title: "课程长度",
                context: tk.courseLength + "分钟",
                type: "text"
              },
              {
                title: "课程类型",
                context: tk.courseType == 'online' ? '在线' : '线下',
                type: "text"
              },
              {
                title: "价格",
                context: tk.price ? tk.price + '元' : '免费',
                type: "text",
                class: "sp2"
              }
            ]
          }
        }

        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });

        // 复制4Xbanner
        let banner_4 = {};
        banner_4.topDiary = [];
        for (var k = 0; k < 4; k++) {
          banner_4.topDiary.push({
            subtt: "课程时长",
            created_at: toRe[k].func[0].context,
            title: toRe[k].title,
            body: toRe[k].title,
            cover: toRe[k].img
          })
        }
        this.$set(this, 'banner_data', banner_4);

      },
      reDataAct(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        let toRe = [];
        for (var k in re.diary) {
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
              link: tk.url
            }]
          }
        }

        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });
      },
      change_list(type) {
        if (!this.cou) {
          this.cou = this.cou_tp;
        }
        this.cou_tp = false;
        if (type == 'all') {
          this.cou_tp = this.cou
        } else {
          this.cou_tp = this.cou
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

  function CcAnimate(tag, opt, time) {
    var _this = this
    this.time = time;
    this.timer = null;
    this.setTime = function (set) {
      this.time = set
    };
    // 初始化
    this.int = function (nTag, nOpt, nTime) {
      tag = nTag || tag;
      opt = nOpt || opt;
      time = nTime || time;
      let initCSS = {};
      this.gapCSS = {};
      for (var k in opt) {
        initCSS.k = getStyle(tag, k);
        let gp = parseInt(opt.k)
        if (gp) {
          this.thisCSS.k = opt.k;
          this.gapCSS.k = gp / 30 * time;
        }
      }
      setNext(initCSS);
      if (_this.timer) {
        clearInterval(_this.timer)
      }
    }


    this.run = function () {
      if (this.timer) {
        return
      };
      this.timer = setInterval(function () {
        if (_this.time < 0) {
          clearInterval(_this.timer);
          setNext(opt);
          _this.timer = null;
        } else {
          _this.getNextOpt(_this.thisCSS, _this.gapCSS);
          setNext(_this.thisCSS)

          _this.time -= 30;
        }
      }, 30)
    }

    this.getNextOpt = function (thisOpt, gap) {
      for (var k in thisOpt) {
        let val = parseInt(thisOpt.k);
        if (val) {
          _this.thisCSS.k = thisOpt.k.replace(val, val + gap.k);
        }
      }
    }

    function setNext(opts) {
      let styles = ''
      for (var k in opts) {
        styles += k + ":" + opts.k + ";";
      }
      tag.setAttribute('style', styles)
    }

    function getStyle(element, attr) {
      if (element.currentStyle) {
        return element.currentStyle[attr];
      } else {
        return getComputedStyle(element, false)[attr];
      }
    }

  }

</script>

<style scoped>
</style>
