<template>
  <div class="pages" id="courses">
    <banner :banner_data='banner_data' class="pt-5 mt-4" />

    <div class="bk-line"></div>

    <coursenav :data="nav_data" id="course-nav" v-on:change_tp="change_list" />

    <div class="container-fluid courses">
      <div class="row" v-if="showList[0]">
        <div class="col-xl-2 bd-t2 bd-b2"></div>
        <div class="col-xl-8">
          <div class="row mgbox-top">
            <card0 class="col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in showList" :data="k" :key="no"
              :sType="'img_only'" />
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
    <div class="bk-line"></div>
    <wxnav0 />
    <div class="bk-line"></div>
    <wxnav1 />


  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import card0 from '@/components/temps/section-card-1.vue'
  import coursenav from '@/components/temps/type-nav.vue'
  import addmore from '@/components/temps/add-more.vue'
  import wxnav0 from '@/components/temps/wx-nav0.vue'
  import wxnav1 from '@/components/temps/wx-nav.vue'

  export default {
    name: 'join',
    data() {
      return {
        nav_data: {
          list: [{
            title: "工作室",
            type: 't01'
          }, {
            title: "会议室",
            type: 't02'
          }, {
            title: "创业沙龙中心",
            type: 't03'
          }],
          type_title: "园区空间",
          seek: {
            placeholder: "工作室/会议室",
          },
          context: "公益空间+上下游创意产业资源，杨浦众创本身就成为了国内最具规模的创意机构，数 十家极富创造力的工作室在杨浦众创共同工作"
        },
        list_tt: {
          act: '热门活动',
          cou: '热门课程',
          tut: '优秀导师',
          cpy: '入驻企业'
        },
        thisPage: 1,
        banner_data: false,
        act: false,
        cou: false,
        cou_tp: false,
        tut: false,
        join: false,
        cpy: false,
        showList: [],
        am_type: 'more',
        card0,
      }
    },
    components: {
      // tsection,
      banner,
      coursenav,
      wxnav0,
      wxnav1,
      card0,
      addmore
    },
    mounted() {
      var _this = this;
      this.cc.ajax('/section/list/join', {
        format: "json",
        page: this.thisPage
      }, this.reData, 'join');
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      showMore(list, no) {
        list = list || this.join.diary;
        no = no || 6;
        if (list.length >= no) {
          // Array.prototype.push.apply(this.showList, list.splice(0, no))
          let toPush = list.splice(0, no)
          for (var k = -1; toPush[++k];) {
            this.showList.push(toPush[k])
          }
          this.$set(this, 'showList', this.showList)
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
        this.cc.ajax('/section/list/join', {
          format: "json",
          page: this.thisPage
        }, this.reData, 'join');
      },
      reData(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        let toRe = [];
        for (var k in re.diary) {
          let tk = re.diary[k];
          toRe[k] = {
            subtt: tk.subtt,
            context: tk.context,
            created_at: tk.created_at,
            img: tk.img,
            title: tk.name,
            func: tk.func
          }
        }
        if (this.tag && this.tag.diary) {
          Array.prototype.unshift.apply(toRe, this[tag].diary)
        }
        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });
        // 复制4Xbanner
        let banner_4 = {};
        banner_4.topDiary = [];
        if (!this.banner_data) {
          for (var k = 0; toRe[k] && k < 4; k++) {
            banner_4.topDiary.push({
              subtt: toRe[k].subtt,
              created_at: "咨询人数：" + toRe[k].created_at,
              title: toRe[k].title,
              body: toRe[k].context,
              cover: toRe[k].img
            })
          }
          this.$set(this, 'banner_data', banner_4);
        }
        if (this[tag].diary.length >= 6) {
          this.am_type = 'more';
          this.showMore(this[tag].diary, 6)
        } else {
          this.showMore(this[tag].diary, this[tag].diary.length)
          this.am_type = 'none';
        }
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
