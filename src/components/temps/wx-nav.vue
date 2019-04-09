<template>
  <div class="container-fluid">
    <div class="row pb-5 bk-wt bd-b2">
      <h3 class="h3 mb-4 py-4 ml-5">微信入驻流程</h3>
    </div>
    <div class="row serveList bk-wt">
      <div class="col sp2" v-for="k in msg">
        <div class="row" v-if="k.context">
          <div class="col-4 d-lg-block d-xl-block d-none"></div>
          <div class="col-12 col-lg-4 col-xl-4">
            <div class="row">
              <div class="icon" :class="k.iconClass"></div>
            </div>
          </div>
        </div>
        <div class="row h-100 align-items-center" v-else>
            <div class="icon col" :class="k.iconClass"></div>
        </div>
        <h5 v-if="k.context" class="h5 text-center my-3">{{k.context}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col bk-qrcode bkimg">
        <div class="row h-100">
          <div class="m-auto">
            <h3 class="h4 cfff text-center">
              关注公众号
            </h3>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top_nav',
    data() {
      return {
        msg: [{
            iconClass: "wx1",
            context:"关注杨浦众创公众号"
          },{
            iconClass: "to-next",
          }, {
            iconClass: "wx2",
            context:"填写入驻申请"
          }, {
            iconClass: "to-next",
          }, {
            iconClass: "wx3",
            context:"园区审核"
          }, {
            iconClass: "to-next",
          }, {
            iconClass: "wx4",
            context:"线下参观签约入驻"
          }
        ]
      }
    },
    // props: ['data'],

  }

</script>

<style scoped>
.wx1{
  background-image: url("../../../static/img/wx1-1.png");
}
.wx2{
  background-image: url("../../../static/img/wx2-1.png");
}
.wx3{
  background-image: url("../../../static/img/wx3-1.png");
}
.wx4{
  background-image: url("../../../static/img/wx4-1.png");
}
.serveList>div:hover .wx1{
  background-image: url("../../../static/img/wx1-0.png");
}
.serveList>div:hover .wx2{
  background-image: url("../../../static/img/wx2-0.png");
}
.serveList>div:hover .wx3{
  background-image: url("../../../static/img/wx3-0.png");
}
.serveList>div:hover .wx4{
  background-image: url("../../../static/img/wx4-0.png");
}

.serveList>.sp2{
  padding: 5em 2em;
}
.serveList>.sp2:nth-child(2n){
  background: transparent;
  max-width: 10%;
}
.serveList>.sp2:nth-child(2n) .to-next{
  padding-top: 80%;
  transform: rotateZ(-90deg);
  background-size: 32%;
}
.bk-qrcode{
  /* height: 28.5%;
  min-height: 28.5%; */
  padding-top: 28.5%;
  background-image: url("../../../static/img/qr-code_bk.png");
}
.bk-qrcode>.row{
  top: 0;
  left: 15px;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, .64)
}
.bk-qrcode .m-auto{
  width: 8%;
  transform: scale(1);
  transition:all .3s ease-out;
  /* margin: auto; */
  background-image: url("../../../static/img/loading.png");
}
.bk-qrcode:hover .m-auto{
  transform: scale(1.2);
}
.bk-qrcode .icon{
  background-image: url("../../../static/img/qr-code_0.png");
}
</style>
