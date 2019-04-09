<template>
  <div class="courses-nav container-fluid">
    <div class="row">
      <div class="col-xl-2 nav-head">
        <h2 class="h3 p-4">{{data.type_title}}</h2>
      </div>
      <div class="col-xl-10">
        <div class="row seekBox justify-content-end">
          <div class="col-xl-3 p-4">
            <div class="input-group">
              <input type="text" class="form-control" :placeholder="data.seek.placeholder" :aria-label="data.seek.placeholder" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-secondary" type="button">
                  搜索
                  <i class="fa to-right">></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ul class="row nav-btn align-items-center text-nowrap">
          <router-link class="col" tag="li" to="./" v-on:click.native="$emit('change_tp', 'all')" replace>
            <span>全部</span>
          </router-link>
          
          <router-link v-for="kk in data.list" class="col" tag="li" :key="kk.type" :to="'./?tp='+kk.type" v-on:click.native="$emit('change_tp', '1')" replace>
            <span>{{kk.title}}</span>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-2 to-next sp2">
      </div>
      <div class="col-10 bk-bd">

      </div>
    </div>

    <div class="row bk-wt seekBox sp2 bd-y-2">
      <div class="col-xl-2 d-none d-xl-block">
      </div>
      <div class="col-12 col-xl-8">
        <h5 class="h5 w-75 lcont">
          {{data.context}}
        </h5>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'top_nav',
    data() {
      return {}
    },
    props: ['data'],

  }

</script>

<style scoped>
  .courses-nav {
    background-color: white;
  }
  .nav-btn,.nav-btn>li {
    border: 1px solid #eeecec;
  }
  .nav-head{
    border-bottom: 2px solid #eeecec;
  }
  .nav-btn>li {
    color: #949494;
    cursor: pointer;
    height: 4em;
    font-size: 16px;
    display: flex;
    vertical-align: bottom;
    padding: 0 1.5em;
    transition: all .6s;
  }
  .nav-btn>li:first-of-type{
    max-width: 10em;
  }
  .nav-btn>li>span {
    align-self: flex-end;
    padding-bottom: .6em;
}
  .nav-btn>.router-link-exact-active,
  .nav-btn>li:hover {
    background-color: #404040;
    color: #fff;
  }
  .to-next.sp2{
    padding-top: 15%;
    background-size: 22%;
  }
  .fa{
    padding: .0em 1em;
    height: 1.5em;
  }
  .btn-secondary{
    background-color: #404040;
    border-color: #404040;
  }
  .btn-secondary:hover{
    background-color: #555555;
    border-color: #555555;
  }

  /* .nav-btn>.router-link-exact-active::before, .nav-btn>li:hover::before{
    content: '';
    position: absolute;
    display: block;
    width: calc(100% - 2.6em);
    left: 1.3em;
    bottom: 0.1em;
    height: 4px;
    border-radius: 2px;
    background-color: #050505;
    animation: 300ms fadeInUp;
  } */

</style>
