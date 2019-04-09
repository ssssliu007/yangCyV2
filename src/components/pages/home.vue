<template>
  <div class="pages" id="home">
    <banner v-if='banner_data' :banner_data='banner_data' class="pt-5 mt-4" />
    <div class="container">
      <ul class="topArtcle row">
        <li class="col-4 p-4" v-for="(k,index) in banner_data.topDiary" :key="index" v-if="index >= 4 && index <= 6">
          <h5>
            <a :href="k.link" class="one-line">
              {{k.title}}
            </a>
          </h5>
        </li>
      </ul>
    </div>
  <div class="container-fluid home">
    <div class="row">
      <tsection v-if='act' v-on:get_more="getMore" :section_data='act' :type_1="{type: section_card_0,data:act.diary[0]}" :type_2="{type: section_list,data:act}"
        :type_more="section_card_0" />
    </div>
    <div class="row">
      <tsection v-if='cou' v-on:get_more="getMore" :section_data='cou' :type_1="{type: section_card_0,data:cou.diary[0]}" :type_2="{type: section_list,data:cou}"
        :type_more="section_card_0" />
    </div>
    <div class="row">
      <tsection v-if='tut' v-on:get_more="getMore" :section_data='tut' :type_2="{type: section_card_0,data:tut.diary[0]}" :type_1="{type: section_list,data:tut}"
        :type_more="section_card_0" />
    </div>
    <div class="row">
      <tsection v-if='cpy' v-on:get_more="getMore" :section_data='cpy' :type_1="{type: section_card_0,data:cpy.diary[0]}" :type_2="{type: section_list,data:cpy}"
        :type_more="section_card_0" />
    </div>
    <div class="row">
      <tsection v-if='join' v-on:get_more="getMore" :section_data='join' :type_1="{type: section_card_0,data:join.diary[0]}" :type_2="{type: section_card_0,data:join.diary[1]}"
        :type_more="section_card_0" />
    </div>
  </div>
  </div>
</template>

<script>
  import banner from '@/components/temps/banner0.vue'
  import tsection from '@/components/temps/section.vue'
  import section_list from '@/components/temps/section-list.vue'
  import section_card_0 from '@/components/temps/section-card-0.vue'
  // import section_card_1 from '@/components/temps/section-card-1.vue'
  // import section_card_2 from '@/components/temps/section-card-2.vue'
  export default {
    name: 'home',
    data() {
      return {
        list_tt: {
          act: '热门活动',
          cou: '热门课程',
          tut: '优秀导师',
          cpy: '入驻企业'
        },
        banner_data: false,
        act: false,
        cou: false,
        tut: false,
        join: false,
        cpy: false,
        section_list,
        section_card_0,
        // section_card_1,
        // section_card_2,
      }
    },
    components: {
      tsection,
      banner
    },
    mounted() {
      console.log('e')
      this.cc.ajax('/diary/super/news/list/22441', {
        format: 'json'
      }, this.reData, 'banner_data')
      this.cc.ajax('/diary/categroy/0', {
        format: "json",
        member_id: 22441,
        type: 4
      }, this.reDataAct, 'act');
      this.cc.ajax('/user/v82z105m680r970/pubget.php', {
        kxt: 1,
        par: 'corpId=nxb&begin=2016-06-25'
      }, this.reDataCus, 'cou');
      this.cc.ajax('/section/tut', '', this.reData, 'tut');
      this.cc.ajax('/section/join', '', this.reData, 'join');
      this.cc.ajax('/section/cpy', '', this.reData, 'cpy');
    },
    methods: {
      getMore(tagName,pageNo){
        console.log(tagName,pageNo)
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

        for (var k in result.result) {
          let tk = result.result[k];
          toRe[k] = {
            title: tk.courseName,
            context: tk.description.replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, ''),
            subtt: '章节长度：' + tk.chapters.length,
            img: tk.image,
            sub_head: ' ',
            sub_head2: ' ',
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

        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });
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
              link: tk.url
            }]
          }
        }
        this.$set(this, tag, {
          diary: toRe,
          type: tag,
          list_tt: this.list_tt[tag]
        });
      }

    }
  }

// 对象 key  键名重命名
// tag == 对象, tagV == key_name, newV == 新key_name
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
