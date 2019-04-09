<template>
  <div id="app">
    <toper />

    <router-view />

    <navfooter />
  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import toper from '@/components/temps/top-nav.vue'
  import navfooter from '@/components/temps/foot-nav.vue'
  export default {
    name: 'App',
    data() {
      return {
        banner_data: '',
        artcles: ''
      }
    },
    components: {
      banner,
      toper,
      navfooter,
    },
    mounted() {
      $(window).on('scroll', function (e) {
        let box = $('#to-top-box');
        if (!box[0]) {
          return
        }
        let c = $(window).scrollTop();
        let val = c + window.innerHeight * .6 - box.offset().top;
        if (val < 800) {
          $('#to-top').removeClass('show').css({
            'top': '',
            'bottom': -2
          })
        } else if (val > parseInt(document.querySelector('#to-top-box').offsetHeight) - 100) {
          $('#to-top').css({
            'top': '',
            'bottom': -2
          })
        } else {
          $('#to-top').addClass('show').css({
            'top': val,
            'bottom': ''
          });
        }
      })
    },
    methods: {
      reData(re, tag) {
        re = typeof re == 'string' ? JSON.parse(re) : re;
        re.type = tag;
        // re.list_tt = this.list_tt[tag]
        console.log(re)
        this[tag] = re;
      },
    },
  }

</script>
