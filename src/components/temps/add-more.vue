<template>
  <div class="add-more container-fluid">
    <div class="row" v-if="type!='none'">
      <div class="col d-xl-block d-none"></div>
      <div class="col-xl-5 col-4 ml-auto tt-block" :class="'tt-'+type">
        <div class="row h-100">
          <div class="col-xl-3 col-6 tt-icon icon1" @click="$emit('func')"></div>
          <div class="col-xl-3 col-6">
            <div class="row h-100">
              <div class="col-7 tt-icon icon2" @click="$emit('func')"></div>
            </div>
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
      return {}
    },
    props: ['type']
  }

</script>

<style scoped>
  .add-more .tt-block {
    min-height: 134px;
    height: 134px;
    background-color: white;
    /* width: 55.5%;
    min-width: 55.5%; */
  }

  .tt-icon {
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .tt-loading .icon1 {
    animation: role 800ms infinite linear;
    background-size: 25%;
    background-image: url('../../../static/img/loading.png');
  }

  .tt-more .icon1 {
    background-size: 25%;
    background-image: url('../../../static/img/add-more0.png');
  }

  .tt-more .icon2 {
    background-size: contain;
    background-image: url('../../../static/img/add-more1.png');
  }

  .tt-loading .icon2 {
    background-size: contain;
    background-image: url('../../../static/img/loading1.png');
  }

</style>
