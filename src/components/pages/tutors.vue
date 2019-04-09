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
            <card0 @click.native="toDetial(k.id)" class="poin col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in showList" :data="k" :key="no" />
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
    <div class="bk-line"></div>
    <div class="bk-line"></div>

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
        nav_data: {
          list: [{
            title: "讲师",
            type: 't01'
          }, {
            title: "导师",
            type: 't02'
          }, ],
          type_title: "优秀导师",
          seek:{
            placeholder:"讲师/导师"
          },
          context: '严格筛选全国40000多位优秀导师'
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
      card0,
      addmore
    },
    mounted() {
      var _this = this;
      this.getIntData()
    },
    methods: {
      getIntData() {
        this.cc.ajax('/section/tut', {
          format: "json",
          page: this.thisPage
        }, this.reDataAct, 'act');
      },
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      showMore(list, no) {
        list = list || this.act.diary;
        no = no || 12;
        if (list.length >= no) {
          Array.prototype.push.apply(this.showList, list.splice(0, no))
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
        // showMore(this.act.diary,6);
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
      reDataAct(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        let toRe = [];
        console.log(re)
        for (var k in re.diary) {
          let tk = re.diary[k];
          toRe[k] = {
            id: tk.id,
            subtt: tk.subtt,
            context: '简介：' + tk.body,
            created_at: tk.created_at,
            img: tk.img,
            title: tk.title,
            func: [{
              title: "咨询人数",
              context: tk.ask_number + "人",
              type: "text",
              class: "sp2"
            }]
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
        console.log(toRe)
        if (!this.banner_data) {
          for (var k = 0; toRe[k] && k < 4; k++) {
            banner_4.topDiary.push({
              subtt: toRe[k].subtt,
              created_at: "咨询人数：" + toRe[k].func[0].context,
              title: toRe[k].title,
              body: toRe[k].context,
              cover: toRe[k].img
            })
          }
          this.$set(this, 'banner_data', banner_4);
        }
        if (this.act.diary.length >= 12) {
          var _this = this;
          // setTimeout(() => {
          _this.am_type = 'more';
          _this.showMore(_this.act.diary, 12)
          // }, 1500);
        } else {
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
      },
      toDetial(id){
        window.open('#/tutors/'+id,"tutors_"+id)
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
