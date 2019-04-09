<template>
  <div class="pages" id="courses">
    <banner v-if='banner_data' :banner_data='banner_data' class="pt-5 mt-4" />

    <div class="bk-line"></div>

    <div class="container-fluid">
      <div class="row pb-5 bk-wt bd-b2">
        <h3 class="h3 mb-4 py-4 ml-5">服务分类</h3>
      </div>
      <div class="row serveList bk-wt">
        <div class="col-lg-2 col-6" v-for="k in serveList">
          <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
              <div class="row">
                <div class="icon" :class="k.iconClass"></div>
              </div>
            </div>
          </div>
          <h5 class="h5 text-center my-3">{{k.title}}</h5>
          <p class="text-center mb-3">{{k.context}}</p>
        </div>
      </div>
    </div>

    <div class="bk-line"></div>

    <coursenav :data="nav_data" id="course-nav" v-on:change_tp="change_list" />

    <div class="container-fluid courses">
      <div class="row" v-if="companys">
        <div class="col-xl-2 bd-b2"></div>
        <div class="col-xl-8">
          <div class="row bd-b2">
            <div class="col-12 bk-bd">
              <h5 class="h5 my-5 c2">公司/服务商</h5>
            </div>
            <table class="table w-100 tab- table-hover m-0" align="center">
              <thead>
                <tr>
                  <th></th>
                  <th>企业名称</th>
                  <th>行业</th>
                  <th>融资</th>
                  <th>地区</th>
                  <th>建立时间</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <card0 @click="" v-for="(k, no) in showList" :data="k" :key="no" />
              </tbody>
            </table>
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
    <wxnav/>

  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import card0 from '@/components/temps/section-card-2.vue'
  import coursenav from '@/components/temps/type-nav.vue'
  import addmore from '@/components/temps/add-more.vue'
  import wxnav from '@/components/temps/wx-nav.vue'

  export default {
    name: 'activities',
    data() {
      return {
        nav_data: {
          list: [{
            title: "产品创客",
            type: 't01'
          }, {
            title: "平面设计",
            type: 't02'
          }, {
            title: "办公协作",
            type: 't03'
          }, {
            title: "企业网站",
            type: 't04'
          }, {
            title: "法律服务",
            type: 't05'
          }, {
            title: "网络安全",
            type: 't06'
          }, {
            title: "企业建设",
            type: 't07'
          }, {
            title: "营销宣传",
            type: 't08'
          }, {
            title: "财务管理",
            type: 't09'
          }, ],
          type_title: "合作企业",
          seek: {
            placeholder: "公司/服务商"
          },
          context: "公益空间+上下游创意产业资源，杨浦众创本身就成为了国内最具规模的创意机构，数 十家极富创造力的工作室在杨浦众创共同工作"
        },
        list_tt: {
          act: '热门活动',
          cou: '热门课程',
          tut: '优秀导师',
          cpy: '入驻企业'
        },
        serveList: [{
            title: "知识产权",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-zscq',
          },
          {
            title: "工商财税",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-gscs',
          },
          {
            title: "设计师",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-sjs',
          },
          {
            title: "办公行政",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-bgxz',
          },
          {
            title: "营销推广",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-yxtg',
          },
          {
            title: "应用开发",
            context: "你可以找到任何适合的创意者为您服务，而且都是经验丰富",
            iconClass: 'icon-yykf',
          }
        ],
        thisPage: 1,
        banner_data: false,
        companys: false,
        showList: [],
        // section_list,
        card0,
        am_type:'more',
        // section_card_1,
        // section_card_2,
      }
    },
    components: {
      banner,
      coursenav,
      addmore,
      card0,
      wxnav,
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
      // this.cc.ajax('/user/v82z105m680r970/pubget.php', {
      //   kxt: 1,
      //   par: 'corpId=nxb&begin=2016-06-25'
      // }, this.reDataCus, 'cou_tp');
      // this.cc.ajax('/section/tut', '', this.reData, 'tut');
      // this.cc.ajax('/section/join', '', this.reData, 'join');
      this.cc.ajax('/section/companys', '', this.reData, 'companys');
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      showMore(list, no) {
        list = list || this.companys.list;
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
        this.cc.ajax('/section/companys', {
          page: this.thisPage
        }, this.reData, 'companys');
      },
      reData(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        re.type = tag;
        re.list_tt = this.list_tt[tag];
        this[tag] = re;
        this.showMore(this[tag].list, 10);
        // 复制4Xbanner
        let banner_4 = {};
        banner_4.topDiary = [];
        let toRe = re.list;
        if (!this.banner_data) {
          for (var k = 0; toRe[k] && k < 4; k++) {
            banner_4.topDiary.push({
              subtt: "建立时间",
              created_at: toRe[k].created_at,
              title: toRe[k].name,
              body: toRe[k].context,
              cover: toRe[k].img
            })
          }
          this.$set(this, 'banner_data', banner_4);
        }

        if(this[tag].list.length >= 10){
          // setTimeout(() => {
          this.am_type = 'more';
          this.showMore(this[tag].list, 10)
          // }, 1500);
        }else{
          this.showMore(this[tag].list, this[tag].list.length)
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

<style>
.icon-zscq{
  background-image: url("../../../static/img/zscq0.png");
}
.icon-bgxz{
  background-image: url("../../../static/img/bgxz0.png");
}
.icon-gscs{
  background-image: url("../../../static/img/gscs0.png");
}
.icon-sjs{
  background-image: url("../../../static/img/sjs0.png");
}
.icon-yxtg{
  background-image: url("../../../static/img/yxtg0.png");
}
.icon-yykf{
  background-image: url("../../../static/img/yykf0.png");
}
.serveList>div:hover .icon-zscq{
  background-image: url("../../../static/img/zscq1.png");
}
.serveList>div:hover .icon-bgxz{
  background-image: url("../../../static/img/bgxz1.png");
}
.serveList>div:hover .icon-gscs{
  background-image: url("../../../static/img/gscs1.png");
}
.serveList>div:hover .icon-sjs{
  background-image: url("../../../static/img/sjs1.png");
}
.serveList>div:hover .icon-yxtg{
  background-image: url("../../../static/img/yxtg1.png");
}
.serveList>div:hover .icon-yykf{
  background-image: url("../../../static/img/yykf1.png");
}
</style>
