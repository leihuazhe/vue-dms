<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Dapeng Mock Server 欢迎你:</div>
    <div class="dapeng-log">
      <img src="../../assets/dapeng/dapeng-logo-02.png"/>
    </div>

  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // import { conversion, conversionOperation } from '@/api/dashboard'
  export default {
    name: 'dashboard',
    data () {
      return {
        data: [
          '梦想就像未曾绽放的花朵要么枯萎要么怒放！',
          '让优秀成为一种习惯！',
          '幸福就是不断实现梦想的过程！',
          '今天叫醒你的是梦想还是闹钟！',
          '不是因为看到了希望才去坚持，而是因为坚持了才会看到希望！',
          '不要在最能吃苦的时候选择安逸！',
          '梦想就是让你坚持而又感到幸福的东西！',
          '被嘲笑的梦想才更有被实现的价值！'
        ],
        loading: false,
        conversionMsg: ''      //转店前端文案提示
      }
    },
    components: {},
    methods: {}

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 50px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
    &-text1 {
      margin-top: 20px;
      font-size: 40px;
      line-height: 46px;
    }
  }

  .update-ship-tip {
    position: fixed;
    left: 200px;
    bottom: 0;
    right: 0;
    height: 70px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-size: 16px;
    box-shadow: 0 -1px 10px #e3e3e3;

    p {
      margin-left: 40px;
    }
  }
</style>
