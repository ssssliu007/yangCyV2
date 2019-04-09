<template>
  <div class="container-fluid">
    <div class="row pb-5 bk-wt bd-b2">
      <h3 class="h3 mb-4 py-4 ml-5">微信企业服务</h3>
    </div>
    <div class="row bk-wt">
      <div class="col-12 col-sm-4 in2bd" v-for="k in msg">
        <div class="row bd-b2">
          <h4 class="h4">
            {{k.title}}
          </h4>
        </div>
        <div class="row">
          <ul>
            <li v-for="kk in k.list">{{kk.title}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wx_nav0',
    data() {
      return {
        msg: [
          {
          title: "创业服务",
          list: [{
              title: "·办公空间"
            },
            {
              title: "·产品试制"
            },
            {
              title: "·创业咨询"
            }
          ]
        },
        {
          title: "产品服务",
          list: [{
              title: "·市场咨询服务"
            },
            {
              title: "·产品路线规划服务"
            },
            {
              title: "·品牌推广服务"
            },
            {
              title: "·供应链整合服务"
            },
            {
              title: "·销售渠道集成服务"
            }
          ]
        },
        {
          title: "企业服务",
          list: [{
              title: "·人才对接"
            },
            {
              title: "·资本对接"
            }
          ]
        }
      ]
      }
    },
    // props: ['data'],

  }

</script>

<style scoped>
.in2bd:nth-child(2)>.row{
  border-left: 2px solid #eeecec;
  border-right: 2px solid #eeecec;
}
.in2bd>.row{
  /* min-height: 3em; */
  font-size: 1.5rem;
  padding: 3rem 3rem 1rem 3rem;
}
.in2bd>.row:last-child{
  font-size: 1rem;
  line-height: 1.8rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
