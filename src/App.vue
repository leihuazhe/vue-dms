<template>
  <div id="app">
    <el-container>
      <el-aside style="width: auto;">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>项目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/p-list">项目列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/p-add">添加项目</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>接口管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">接口管理</el-menu-item>
              <el-menu-item index="2-2">添加接口</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>Swagger管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">Swagger</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">系统参数设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main ref="main">
        <router-view></router-view>
        <!-- <slot></slot> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
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
    .active{
      font-weight: 100;
      font-size: 20px;
    }
  }

  .el-submenu .el-menu-item{
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
    opacity: .5;
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
      opacity: .8;
      i {
        color: #19bf4f;
      }
    }
  }

  .top-enter-active, .top-leave-active {
    transition: opacity .8s;
  }

  .top-enter, .top-leave-to {
    opacity: 0;
  }

}
</style>
