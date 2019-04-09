import Mock from 'mockjs'

const R = Mock.Random;

function Rule() {
  this.color = function () {
    return "#" + R.string('1234567890ABCDEF', 6)
  }

  this.conIn = function (tag, gap) {
    if (!this[tag]) {
      this[tag] = 1;
    }
    this[tag] += gap;
    return this[tag]
  }

  this.phone = function (start, len) {
    let rel = '';
    if (start) {
      rel = start + '';
    } else {
      rel = R.pick([13, 145, 155, 156, 176, 177, 178, 18])
    }
    let rLen = len || 11;
    rel += '';
    rLen -= rel.length;
    rel += R.integer(Math.pow(10, rLen), (Math.pow(10, rLen + 1) - 1))
    return rel
  }

  this.addrs = function () {
    let c, lc;
    let ck = new RegExp('海外');
    do {
      lc = R.city(true);
      if (lc.split(lc.substring(0, 2))[2]) {
        lc = lc.split(' ')[1];
      }
      c = lc + ' ' + R.ctitle(2) + '区 ' + R.ctitle(2, 3) + R.pick([R.character('东 西 南北') + '街', '大道' + R.character('一二三四五') + '段', R.character('东 西 南 北').replace(' ', '') + R.character('一 二 三 四 ').replace(' ', '') + '路']) + ' ' + R.integer(0, 999) + '号';
    } while (ck.test(c))
    return c;
  }

  this.lname = function (len) {
    var re, len;
    len = len || R.pick([2, 3]);
    do {
      if (len == 3) {
        re = R.shuffle([R.clast(), R.ctitle(1)]).join('')
      } else {
        re = R.clast();
      }
    } while (re.length != (len - 1));
    return R.cfirst() + re
  }

  this.ldate = function (dGap, tGap, typeName, type) {
    type = type || 'date-time'
    let td = new Date(),
      gap,
      re;
    if (typeName) {
      gap = this.conIn(typeName, R.integer(1, 20320)) * -1;
    } else {
      gap = R.increment(R.integer(1, 20320)) * -1;
    }
    td.setMinutes(gap);
    let tm = [];
    tm[0] = td.getFullYear();
    tm[1] = td.getMonth() + 1;
    tm[2] = td.getDate();
    tm[3] = td.getHours();
    tm[4] = td.getMinutes();
    for (var k = 0; k < 5; k++) {
      tm[k] = tm[k] < 10 ? '0' + tm[k] : '' + tm[k];
      if (k < 2) {
        tm[k] += dGap
      } else if (k == 2) {
        tm[k] += ' '
      } else if (k == 3) {
        tm[k] += tGap
      }
    }
    re = tm.join('');

    switch (type) {
      case 'date-time':
        return re;
      case 'time':
        return re.split(' ')[1];
      case 'date':
        return re.split(' ')[0];

      default:
        return re;
    }
  }

}

const rule = new Rule()

const banner = function (no) {
  no = no || 3;
  let re = {};
  re.topDiary = [];

  for (var k = 0; k < no; k++) {
    re.topDiary.push({
      cover: R.image('900X500', rule.color()),
      created_at: rule.ldate('-', ':', 'banner'),
      title: R.ctitle(5, 15),
      body: R.cparagraph(8, 15),
      url: "/diary/3191"
    })
  }
  return re
}

const sections = function (type) {
  type = type || 'default';
  if (type == 'cou') {
    var rec;
    $.ajax({
      type: "get",
      url: "./static/courseData.json",
      dataType: "json",
      async: false,
      success: function (re) {
        rec = {
          r: {
            result: re
          }
        }
      },
      error: function (re) {
        console.log(re)
      }
    });
    return rec
  } else if (type == 'cou_det') {
    return {
      r: '{"result":{"courseUrl":"http://preview.kuanxue.com/lrm/controller/RemoteCourse/coursewarePlay?corpId=nxb&playUrl=http%3A%2F%2Fcdn.kuanxue.com%2Fkuanxue%2F20160521201948340xtL4A.mp4%3FExpires%3D1541564651%26OSSAccessKeyId%3DSTS.NJAGXUpoR8jmGgTj5bVdzLC6q%26Signature%3Dg2HKkdCRqj3cjVFipFlIjJTPO2Y%253D%26security-token%3DCAISgQJ1q6Ft5B2yfSjIr4n0DOLhnbBzj6iGRUHljjU3WutWo4adkzz2IH1IfnJhAOAXsPg%252BnG5Y6PoYlq52V4QAHRSdNR%252FSdB3RtVHPWZHInuDox45m4cTXJAr%252BIhr%252F29CoFIedZdjBe%252FCrRknZnytou9XTfimjWFrXXv%252FkjoV8PJZtHWveVzddA8pMLQZPsdITMWCrVcygKRn3mGHdfi0K3wN3kjF48r%252FtgJ%252FeuFj89ASmlrRF%252BNmpcsX1MZY1bcpFPo3rjLAsRM3oyzVN7hVGzqBygZFf9C3P1tPnWAQNuU7XarqFrIE%252BdFEpOPRgAc1Yof3kjuFjoOvXmpREHZvJ8C%252F1ORqAAUzz5aiimA6A7MXlMTKjNFOv5bzjkNUZZUcVHFH9DNMaf6z5pIhJPpoHIE47QiJuR5Q%252BykCp6vPlLIGyNmZ4t0O926Upa2O1zqpO%252BYPDUQVKkl5eFoP%252BQeAdKWTjA%252BlOi1F1LelGrd3RbI6g1%252BgrSxZt7W9EQeBQxlzphxGJaIey"},"message":""}'
    }
  }
  let re = {},
    re_Sub_head = reSub_head(type);
  re.head_img = R.image('1920X930', rule.color(), rule.color(), 'S');
  re.subtt = type == 'cpy' ? '申请入驻' : R.ctitle(10, 25);
  re.diary = [];
  re.sub_head = re_Sub_head[0];
  re.sub_head2 = re_Sub_head[1];
  re.hash_id = rule.phone('ids_', 7);

  if (type == 'join') {
    re.diary.push({
      hash_id: rule.phone('ids_', 7),
      img: R.image('669X439', rule.color(), ''),
      sub_head: '工作室',
      sub_head2: 'studio',
    })
    re.diary.push({
      hash_id: rule.phone('ids_', 7),
      img: R.image('669X439', rule.color(), ''),
      sub_head: '会议室',
      sub_head2: 'boardroom',
    })
  } else if (type == 'cpy') {
    for (var kk = 0; kk < 20; kk++) {
      let dd = rule.ldate('-', ':', type).split(' ')[0];
      re.diary.push({
        title: R.ctitle(15, 25),
        hash_id: rule.phone('ids_', 7),
        img: R.image('669X439', rule.color(), ''),
        created_at: dd,
        body: R.cparagraph(15,20),
        func: reFunc(type),
        sub_head: '入驻时间',
        sub_head2: dd,
      })
    }
  } else {
    for (var kk = 0; kk < 20; kk++) {
      re.diary.push({
        title: R.ctitle(15, 25),
        addr_info: "上海市杨浦区国定东路200号4号楼2楼会议室",
        subtt: R.ctitle(5, 15),
        body: R.ctitle(50, 80),
        id: rule.phone('', 3),
        img: R.image('669X439', rule.color(), ''),
        created_at: rule.ldate('-', ':', type),
        event_sign_start_time: rule.ldate('-', ':', type),
        event_start_time: rule.ldate('-', ':', type),
        event_end_time: rule.ldate('-', ':', type),
        func: reFunc(type),
        ask_number: R.integer(5, 261),
        sub_head: re_Sub_head[2],
        sub_head2: re_Sub_head[3],
      })
    }
  }

  function reSub_head(tp) {
    switch (tp) {
      case 'act':
      case 'cou':
        return ['', '']
      case 'tut':
        return ['导师', 'tutor', '讲师', 'lecturer']
      default:
        return ['', '']
    }
  }

  function reFunc(tp) {
    switch (tp) {
      case 'act':
        return [{
          title: "立即参与",
          type: "btn"
        }, ]
      case 'cou':
        return [{
            title: "课程长度",
            context: R.integer(5, 261) + "分钟",
            type: "text"
          },
          {
            title: "课程类型",
            context: R.pick(["在线", "在线", "在线", "在线", "线下"]),
            type: "text"
          },
          {
            title: "价格",
            context: R.pick(["免费", R.integer(1, 199) + "元", R.integer(1, 199) + "元", R.integer(1, 199) + "元"]),
            type: "text",
            class: "sp2"
          }
        ]
      case 'tut':
        return [{
            title: "咨询人数",
            context: R.integer(5, 261) + "人",
            type: "text",
            class: "sp2"
          },

        ]
    }
  }
  return re
}

function companys(no) {
  let re = {};
  re.list = [];
  for (var k = 0; k < no; k++) {
    re.list.push({
      name: R.ctitle(20, 50),
      context: R.cparagraph(15, 20),
      img: R.image('800X240', rule.color(), 'logo'),
      business_name: R.ctitle(4, 8),
      financing_step: R.ctitle(5, 8),
      district_name: R.city(),
      created_at: rule.ldate('/', ':', 'comps', 'date'),
      id: 'id_' + R.integer(1000, 9999),
      url: 'javascript:void(0)',
    })
  }
  return re
}
const join = function (no) {
  let re = {};
  re.diary = [];
  for (var k = 0; k < no; k++) {
    re.diary.push({
      context: R.cparagraph(15, 20),
      name: R.ctitle(20, 50),
      img: R.image('500X480', rule.color(), 'img'),
      business_name: R.ctitle(4, 8),
      financing_step: R.ctitle(5, 8),
      district_name: R.city(),
      created_at: rule.ldate('/', ':', 'comps', 'date'),
      id: 'id_' + R.integer(1000, 9999),
      url: 'javascript:void(0)',
    })
  }
  return re
}
const diary = function () {
  let re = {
    addr_info: "上海市杨浦区国定东路200号4号楼2楼会议室",
    body: R.cparagraph(20, 50),
    created_at: "2018-10-12 21:15:32",
    event_end_time: "2018-10-17 18:00:00",
    event_sign_start_time: "2018-10-12 00:00:00",
    event_start_time: "2018-10-17 13:30:00",
    file_extra: {
      author: "朱欣",
      pubdate: "Sun, 12 Aug 2018 13:44:21 +0800",
    },
    id: "3191",
    img: "/cache/file/jpg/2018_10_12/0ac52b548250bc6720742cf6d9f14e488d947cd4_jpg.jpg",
    qr_url: "http://m.hcar.cc/album/showqrimage?photoBorder=12&url=https%3A%2F%2Fm.hcar.cc%2Fform%2Ftemp%2Faction%2Fv2%2Fft_2kdvlredo0360p8",
    title: "活动｜1017详解企业减税降费",
    type: "4",
    url: "/diary/3191?format=json",
  };

  return re
}
const tutor = function (type) {
  let re;
  if (type == 'video') {
    re = []
    for (var k = 0; k++ < 20;) {
      re.push({
        title: R.ctitle(20, 50),
        img: R.image('500X480', rule.color(), 'img'),
        id: R.integer(1000, 9999),
      })
    }
  } else {
    re = {
      name: rule.lname(),
      title: R.ctitle(15, 25),
      img: R.image('500X480', rule.color(), 'img'),
      body: R.ctitle(50, 80),
      ask_number: R.integer(5, 261),
    }
  }
  return re
}
const company = function () {
  let prd = [];
  for(var k =0,len = R.integer(2,6);k<len;k++){
    prd.push({
      name: R.ctitle(15, 25),
      img: R.image('500X480', rule.color(), 'app'),
      body: R.cparagraph(15, 25),
    })
  }
  let re = {
    name: R.ctitle(15, 25),
    title: R.ctitle(50, 80),
    qr_url: "http://m.hcar.cc/album/showqrimage?photoBorder=12&url=https%3A%2F%2Fm.hcar.cc%2Fform%2Ftemp%2Faction%2Fv2%2Fft_2kdvlredo0360p8",
    img: R.image('500X480', rule.color(), 'img'),
    business_name: R.ctitle(4, 8),
    department_size: R.pick(['0-15人','15-50人','50-100人','100-500人','500-2000人','2000人以上']),
    financing_step: R.ctitle(5, 8),
    district_name: R.city(),
    created_at: rule.ldate('/', ':', 'comps', 'date'),
    body: R.ctitle(50, 80),
    product:prd,
  }
  return re
}

Mock.mock(/diary\/super\/news\/list\/22441/, 'get', banner(5))
Mock.mock(/diary\/categroy\/0/, 'get', sections('act'))
Mock.mock(/user\/v82z105m680r970\/pubget.php/, 'get', function (e) {
  console.log(e)
  var kxt = e.url.split('kxt=')[1].substr(0, 1)
  if (kxt == '1') {
    return sections('cou')
  } else if (kxt == '2') {
    return sections('cou_det')
  }
})
Mock.mock(/diary\/[0-9]*/, 'get', diary())

Mock.mock(/tutor\/[0-9]*\/video/, 'get', tutor('video'))
Mock.mock(/tutor\/[0-9]*/, 'get', tutor())
Mock.mock(/company\/[0-9]*/, 'get', company())
Mock.mock(/section\/tut/, 'get', sections('tut'))
Mock.mock(/section\/join/, 'get', sections('join'))
Mock.mock(/section\/cpy/, 'get', sections('cpy'))
Mock.mock(/section\/companys/, 'get', companys(20))
Mock.mock(/section\/list\/join/, 'get', join(20))
