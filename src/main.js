// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// css
import 'animate.css'
import '@bsp/css/bootstrap.min.css'
import '@swp/css/swiper.min.css'
import './assets/css/index.css'

// js
import 'jquery'
import 'popper.js'
import 'bootstrap'
import './mockjs'
import {WOW} from 'wowjs'
import Swiper from 'swiper'
import $clamp from 'clamp-js'


// Vue.use(clamp)
Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.directive('bkimg', function (el, bind) {
  var bindV = bind.value;
  if(!bindV){return}
  el.style.backgroundImage = 'url(' + bindV + ')';
})

let swipers = {}

Vue.directive('swiper', function (el, bind) {
  setTimeout(() => {
    if(swipers[el.id]){
      swipers[el.id].destroy();
    }
    // else{
      swipers[el.id] = new Swiper(el, bind.value);
    // }
  }, 100);
})

Vue.directive('clamp', function (el, bind) {
  $(el).addClass(['clamp','clamp'+bind.value]).css('maxHeight',parseInt($(el).css('lineHeight'))*bind.value+'px');
  $clamp(el, {
    clamp: bind.value
  })
})

// Vue.directive('wow', function (el, bind) {
//   new WOW(bind.value).init()
// })


const cc = {};

cc.ajax = function(url, data, callBack, prams, reFunct){
  if(!reFunct){
      $.ajax({
        type: "get",
        url: url,
        data: data,
        dataType: 'json',
        success: function (re) {
          callBack(re, prams)
        }
      });
  }else{
    $.ajax(reFunct)
  }
}
let wowList = {}
cc.wow = function(opt){
  let kv = opt.boxClass||Symbol('wow');
  if(wowList[kv]){
    delete wowList[kv];
  }
  wowList[kv] = new WOW(opt);
  return wowList[kv]
}

Vue.prototype.cc = cc;

// console.log($clamp)
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

window.$ = $;