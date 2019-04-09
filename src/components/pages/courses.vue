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
            <card0 @click.native="toDetial(k)" class="poin col-xl-4 col-12 col-sm-6 col-lg-4 t_show" v-for="(k, no) in showList" :data="k" :key="no"/>
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
    name: 'courses',
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
          type_title: "课程分类",
          seek:{
            placeholder:"公司/服务商"
          },
          context: '你可以找到任何适合的创意者为您服务，而且都是经验丰富的实战者和行业专家，从产品到营销，从设计到品牌，创意链里的任何问题，创造域都能提供最优的解决方案'
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
        thisPage: 1,
        showList: [],
        am_type: 'more',
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
      card0,
      addmore
    },
    mounted() {
      var _this = this;
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
      showMore(list, no) {
        list = list || this.cou_tp.diary;
        no = no || 12;
        // console.log(list)
        // console.log(this.showList)
        if (list.length >= no) {
          // Array.prototype.push.apply(this.showList, list.splice(0, no))
          let toPush = list.splice(0, no)
          for (var k = -1; toPush[++k];) {
            this.showList.push(toPush[k])
          }
          this.$set(this, 'showList', this.showList)
        } else {
          this.getMore()
        }
      },
      getMore() {
        if (this.am_type != 'more') {
          return
        }
        this.am_type = 'loading';
        this.thisPage++;
        this.cc.ajax('/user/v82z105m680r970/pubget.php', {
          kxt: 1,
          par: 'corpId=nxb&begin=2016-06-25',
          page:this.thisPage,
        }, this.reDataCus, 'cou_tp');
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
      reDataCus(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        if (!re.r) {
          return
        }
        let result = typeof re.r == 'string' ? JSON.parse(re.r) : re.r;
        let toRe = [];
        
        // console.log(result.result)
        for (var k in result.result) {
          let tk = result.result[k];
          toRe[k] = {
            title: tk.courseName,
            context: tk.description.replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, ''),
            contextPr: tk.description,
            subtt: '章节长度：' + tk.chapters.length,
            img: tk.image,
            sub_head: ' ',
            sub_head2: ' ',
            chapters: tk.chapters,
            courseId: tk.courseId,
            catalogId: tk.catalogId,
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

        if (this[tag] && this[tag].diary) {
          Array.prototype.unshift.apply(toRe, this[tag].diary)
        }
        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });
        // console.log(this[tag].diary)
        // 复制4Xbanner
        let banner_4 = {};
        banner_4.topDiary = [];
        if(!this.banner_data){
          for (var k = 0;toRe[k] && k < 4; k++) {
            banner_4.topDiary.push({
              subtt: "课程时长",
              created_at: toRe[k].func[0].context,
              title: toRe[k].title,
              body: toRe[k].title,
              cover: toRe[k].img
            })
          }
          this.$set(this, 'banner_data', banner_4);
        }
        if (this[tag].diary.length >= 12) {
          this.am_type = 'more';
          this.showMore(this[tag].diary, 12)
        } else {
          this.showMore(this.act.diary, this.act.diary.length)
          this.am_type = 'none';
        }

      },
      // reDataAct(re, tag) {
      //   re = typeof re == 'string' ? JSON.parse(re) : re;
      //   let toRe = [];
      //   for (var k in re.diary) {
      //     let tk = re.diary[k];
      //     toRe[k] = {
      //       subtt: tk.addr_info,
      //       context: tk.event_start_time + ' 至 ' + tk.event_end_time.substring(5, 18),
      //       created_at: tk.event_sign_start_time,
      //       img: tk.img,
      //       title: tk.title,
      //       func: [{
      //         title: "立即参与",
      //         type: "btn",
      //         link: tk.url
      //       }]
      //     }
      //   }
      //   this.$set(this, tag, {
      //     diary: toRe,
      //     type: tag,
      //     list_tt: this.list_tt[tag]
      //   });
      // },
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
      toDetial(data){
        sessionStorage.setItem(data.courseId, JSON.stringify(data));
        sessionStorage.setItem(
          'more_cous_info', 
          JSON.stringify( Array.prototype.concat(this.cou_tp.diary, this.cou_tp.showList) )
        );
        
        const { href } = this.$router.resolve({path:'/courses/'+data.courseId})
        window.open(href, '_blank');

        // this.$router.push( {path:'/courses/detail/'+data.courseId} )
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
