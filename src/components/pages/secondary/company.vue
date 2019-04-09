<template>
  <div class="sec-pages">

    <div class="row">
      <div class="bk-line"></div>
    </div>

    <div class="container-fluid bk-wt bd-b2">
      <div class="row px-4 pt-4">
        <div class="col pb-5">
          <h4 class="h4 one-line fx">
            公司介绍<span class="bklong align-self-center"></span>{{info.name}}
          </h4>
          <p class="c1">{{info.title}}</p>
          <h4 class="pt-5"></h4>
        </div>
        <div class="col-auto">
          <span class="btn btn-secondary">联系该企业</span>
        </div>
      </div>
    </div>
    <div class="container-fluid courses" v-if="info">
      <div class="row">
        <div class="col-xl-3 p-0">
          <div class="bkimg img65" v-bkimg="info.img"></div>
        </div>
        <div class="col-xl-9 bd-l2 bd-r2 pt-3 px-5">
          <h5 class="h5 py-3">
            {{info.name}}
          </h5>
          <p class="mb-1">主营业务：{{info.business_name}}</p>
          <p class="mb-1">融资情况：{{info.financing_step}}</p>
          <p class="mb-1">公司规模：{{info.department_size}}</p>
          <p class="mb-1" v-clamp="3">公司简介：{{info.body}}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="bk-line"></div>
    </div>
    <div class="container-fluid" v-if="info">
      <div class="row bk-wt seekBox sp2 bd-y-2" id="course-nav">
        <div class="col-xl-2 d-none d-xl-block">
        </div>
        <div class="col-12 col-xl-8">
          <h5 class="h5 w-75 lcont">
            公司产品
          </h5>
        </div>
      </div>
      <div class="row tut-vedio bg-white">

        <div class="col-xl-2 bd-t2 bd-b2"></div>
        <div class="col-xl-8 bd-t2 bd-l2">
          <div class="row fk-u">
            <div class="col-12" v-for="k in info.product">
              <div class="row">
                <div class="col-7 bd-b2 p-0">
                  <img class="w-100" :src="k.img" alt="k.name">
                </div>
                <div class="col-5 bk-bd py-4 px-5 bd-b2 bd-wt">
                  <h5 class="com-name h5 cont-body">{{k.name}}</h5>
                  <div class="h5 py-5"></div>
                  <p class="cont-body">
                    <span>产品介绍：</span><br>
                    <span v-clamp="3">{{k.body}}</span>
                  </p>
                </div>
              </div>
            </div>
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
    <div class="row">
      <div class="bk-line"></div>
    </div>
    <div class="row">
      <div class="bk-line"></div>
    </div>
    <wxnav />

  </div>
</template>

<script>
  import wxnav from '@/components/temps/wx-nav.vue'

  export default {
    name: 'activities',
    data() {
      return {
        info: false,
        diary_id: '',
      }
    },
    components: {
      wxnav
    },
    mounted() {
      var diary_id = this.$route.params.id;
      if (!diary_id) {
        alert("很抱歉，您浏览的页面不存在！\n将自动帮您返回。")
        this.$router.replace('/activities')
      }
      this.diary_id = diary_id;
      this.cc.ajax('/company/' + diary_id, {
        format: "json",
      }, this.reDataAct, 'info');
    },
    methods: {
      scrollTT(val) {
        $('body,html').animate({
          'scrollTop': $('#course-nav').offset().top
        }, 600)
      },
      reDataAct(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        this.$set(this, tag, re);
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

</script>

<style scoped>
  .com-name{display: flex}
  .com-name::before {
    content: "";
    position: relative;
    display: block;
    width: 3px;
    height: 1em;
    top: .4em;
    margin-right: .5em;
    background-color: #333333;
    border-radius: 1px;
  }
  .fk-u>div:last-child .bd-wt{
    border-color: #eeecec;
  }
  .cont-body{
    line-height: 1.8em;
  }
</style>
