<template>
  <div class="pages" id="courses">
    <banner :banner_data='banner_data' class="pt-5 mt-4" />

    <div class="bk-line"></div>

    <div class="container-fluid" id="course-nav">
      <div class="row bk-wt seekBox sp2">
        <div class="col-xl-2 d-none d-xl-block">
        </div>
        <div class="col-12 col-xl-8">
          <h5 class="h5 w-75 lcont">
            我们一直致力于为创业者提供优质的活动内容
          </h5>
        </div>
        <div class="col-xl-2 bd-l2 d-none d-xl-block">
          <div class="row h-100">
            <div class="col-6 bd-r2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid courses">
      <div class="row" v-if="showList[0]">
        <div class="col-xl-2 bd-t2 bd-b2"></div>
        <div class="col-xl-8">
          <div class="row mgbox-top">
            <card0 class="col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in showList" :data="k" :key="no" />
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
    <addmore :type="am_type" v-on:func="showMore"/>
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
        am_type:'more',
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
      // this.cc.ajax('/diary/super/news/list/22441', {
      //   format: 'json'
      // }, this.reData, 'banner_data')
      this.cc.ajax('/diary/categroy/0', {
        format: "json",
        member_id: 22441,
        type: 4,
        page: this.thisPage
      }, this.reDataAct, 'act');
      // this.cc.ajax('/user/v82z105m680r970/pubget.php', {
      //   kxt: 1,
      //   par: 'corpId=nxb&begin=2016-06-25'
      // }, this.reDataCus, 'cou_tp');
      this.cc.ajax('/section/tut', '', this.reData, 'tut');
      this.cc.ajax('/section/join', '', this.reData, 'join');
      this.cc.ajax('/section/cpy', '', this.reData, 'cpy');
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      showMore(list, no) {
        list = list|| this.act.diary;
        no = no || 12;
        if (list.length >= no) {
          Array.prototype.push.apply(this.showList, list.splice(0, no))
        } else {
          this.am_type = 'loading';
          this.getMore()
        }
      },
      getMore() {
        if(this.am_type=='none'){return}
        this.thisPage++;
        this.cc.ajax('/diary/categroy/0', {
          format: "json",
          member_id: 22441,
          type: 4,
          page: this.thisPage
        }, this.reDataAct, 'act');
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
              link: '#/activities/' + tk.id
            }],
            id: tk.id,
          }
        }
        if(this.tag && this.tag.diary){
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
        if(!this.banner_data){
          for (var k = 0; toRe[k] && k < 4; k++) {
            banner_4.topDiary.push({
              subtt: "开始报名时间",
              created_at: toRe[k].created_at,
              title: toRe[k].title,
              body: '活动时间：' + toRe[k].context,
              cover: toRe[k].img
            })
          }
          this.$set(this, 'banner_data', banner_4);
        }
        if(this.act.diary.length >= 12){
          // setTimeout(() => {
          this.am_type = 'more';
          this.showMore(this.act.diary, 12)
          // }, 1500);
        }else{
          this.showMore(this.act.diary, this.act.diary.length)
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
