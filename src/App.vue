<template>
  <div id="app">
    <el-container>
      <el-aside style="width: auto;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" :collapse="isCollapse"
          router>
          <el-menu-item id="bglogo" index="/" class="bglogo" @click="isCollapse=!isCollapse">
            <i v-if="isCollapse" class="el-icon-d-arrow-right"></i>
            <template slot="title">
              <span>
                {{isCollapse ? '今天DMS系统' : ''}}
              </span>
            </template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>服务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/s-list">服务管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>接口管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/m-list">接口管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>元数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">元数据管理</el-menu-item>
              <!-- <el-menu-item index="3-2">添加thrift</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main ref="main">
        <coPageTabs ref="tab">
          <router-view></router-view>
        </coPageTabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import coPageTabs from './components/common/co-page-tabs'

  export default {
    name: 'app',
    data () {
      return {
        isCollapse: false
      }
    },
    components: { coPageTabs },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss">
  @import "../static/css/common/icon/iconfont.css";
  @import "../static/css/common/index.scss";

  #app {
    .el-aside-btn {
      width: 60px;
      height: 30px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }

    .el-container {
      height: 100%;
    }

    .mainRight {
      float: right;
    }

    #bglogo {
      height: 100px;
    }

    .el-menu-item .pictrue {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: 2px solid #ccc;
      margin-left: 10px;

    }

    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border-bottom: none;
    }

    .el-submenu__title {
      height: 60px;
      line-height: 60px;
    }

    .el-menu-item {
      height: 60px;
      line-height: 60px;
      .active {
        font-weight: 100;
        font-size: 20px;
      }
    }

    /*.bglogo {
       background-color: #19bf4f;
       span {
         width: 160px;
         height: 50px;
         display: inline-block;
         background-image: url(./assets/image/nav_today.png);
         background-size: 100%;
       }
     }*/

    .bglogo {
      /*background-color: #1FAAEF;*/
      background-color: azure !important;
      span {
        width: 160px;
        height: 100px;
        display: inline-block;
        background-image: url(./assets/dapeng/dapeng-logo-03.png);
        background-repeat: no-repeat;
        background-position: center;
        /*background-size: 100%;*/
        background-size: cover;
      }
    }

    .el-submenu .el-menu-item {
      background: #f1f6fa;
    }

    .el-menu-item-group__title {
      padding: 0px;
    }

    .borderBottom {
      border-bottom: 1px solid #e9f0f7;
    }

    .el-aside {
      color: #333;
      text-align: left;
      box-sizing: border-box;
      box-shadow: 1px 3px 5px #ccc;
      overflow: visible !important;
      height: 100%;
      background: #fff;
      .el-radio-button__inner {
        border: 0;
        border-bottom: 1px solid #e9f0f7;
      }
      .el-menu {
        border: 0;
        height: calc(100% - 60px);
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0;
        }
        .borderBottom {
          border-bottom: 1px solid #e9f0f7;
        }
      }
      .el-aside-col {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0;
        border-radius: 0;
        .el-radio-button {
          width: 100%;
          height: 100%;
          .el-radio-button__inner {
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding: 0;
            border-radius: 0;
          }
        }
      }
    }

    .el-main {
      color: #333;
      padding: 30px;
      height: 100%;
    }

    .vue-directive-image-previewer {
      .wrapper {
        z-index: 2;
      }
      .vue-directive-image-previewer-pic {
        z-index: 3;
      }
    }

    // 返回页面顶部
    .caret_top {
      position: fixed;
      bottom: 59px;
      right: 20px;
      width: 48px;
      height: 60px;
      border-radius: 4px;
      color: #454c5a;
      text-align: center;
      overflow: hidden;
      background: #fff;
      box-shadow: 1px 1px 2px 0px #c4ccd6;
      opacity: 0.5;
      cursor: pointer;
      i {
        font-size: 40px;
        margin-top: 2px;
        margin-top: -6px;
      }
      span {
        display: inline-block;
        line-height: 16px;
        width: 40px;
        margin-top: -10px;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
      }
      &:hover {
        // background: #effde8;
        opacity: 0.8;
        i {
          color: #19bf4f;
        }
      }
    }

    .top-enter-active,
    .top-leave-active {
      transition: opacity 0.8s;
    }

    .top-enter,
    .top-leave-to {
      opacity: 0;
    }
  }
</style>
