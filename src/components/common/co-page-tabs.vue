<template>
  <div id="co-page-tabs">
    <div class="co-page-tab">
      <ul class="page-tabs-list">
        <li class="page-close-all active" v-show="this.tabs.length > 1" @click.stop="closeAll">
          <span class="tag">关闭其他</span>
          <i class="iconfont icon-hin_error_-px"></i>
        </li>
        <li v-for="tab in tabs" :key="tab.uuid" :class="{'active':activeId === tab.uuid}" @click="tabClick(tab)">
          <span>{{tab.pageName}}</span>
          <i class="iconfont icon-hin_error_-px" @click.stop="closeTab(tab)"></i>
        </li>
      </ul>
    </div>
    <!--<transition name="el-fade-in-linear" v-if="showTransition"> &lt;!&ndash;如果是打印页面则不能有过渡动画&ndash;&gt;-->
      <keep-alive :include="includesAlive">
        <slot></slot>
      </keep-alive>
    <!--</transition>-->
    <!--<keep-alive :include="includesAlive" v-else>-->
      <!--<slot></slot>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
  import util from '../../assets/js/co-util'
  export default {
    name: 'coPageTabs',
    data () {
      return {
        tabs: [],
        activeId: '',
        includesAlive: [],
        associatePage: {
          GModifyInfo: ['GModifyPrice'],
          GModifyPrice: ['GModifyInfo']
        }
      }
    },
    methods: {
      /*
      * 点击tab栏
      * */
      tabClick (tab) {
        let {name, uuid, params, fullPath, query} = tab
        if (this.activeId !== uuid) {
          this.activeId = uuid // 提前点亮点击的tab栏，视觉效果更好
          this.$nextTick(_ => {
           if (JSON.stringify(params) !== '{}') {
              this.$router.push({name, params, query})
           } else {
             this.$router.push({path: fullPath})
           }
          })
        }
      },
      /*
      * 关闭tab栏事从缓存中清除当前tab栏信息
      * */
      removeTabInfo (tab) {
        let index = this.tabs.findIndex(item => {
          return tab.fullPath === item.fullPath
        })
        if (this.activeId === tab.uuid) { // 如果是关闭当前页面，则跳转到其他页面
          let fullPath = (index - 1) > -1 ? this.tabs[index - 1].fullPath : '/'
          this.$router.push({path: fullPath})
        }
        this.tabs.splice(index, 1)
      },
      /*
      * 关闭tab栏
      * */
      closeTab (tab) {
        this.removeTabInfo(tab)
        this.$nextTick(_ => { // 关闭当前活动页面的时候必须等页面跳转完毕才能清除
          let associatePage = this.associatePage[tab.name] || null
          if (associatePage) {
            associatePage.forEach(item => {
              this.deleteIncludesAlive(item)
            })
          }
          this.deleteIncludesAlive(tab.name)
        })
        this.updateSession()
      },
      /*
      * 关闭除当前活动的tab栏以外的所有tab栏
      * */
      closeAll () {
        if (!this.activeId) return
        let pageIndex = this.tabs.findIndex(tab => {
          return tab.uuid === this.activeId
        })
        const tab = this.tabs[pageIndex]
        this.tabs = [tab]
        this.includesAlive = [tab.name]
        this.updateSession()
      },
      /*
      * 路由页面提交关闭tab栏的方法
      * */
      removeTab (keepAlive) {
        const index = this.tabs.findIndex(value => {
          return value.uuid === this.activeId
        })
        let tab = this.tabs[index]
        this.removeTabInfo(tab)
        if (!keepAlive) {
          this.$nextTick(_ => { // 关闭当前活动页面的时候必须等页面跳转完毕才能清除
            this.deleteIncludesAlive(tab.name)
          })
        }
      },
      closeAssociateTab () {
        const tab = this.tabs.find(item => {
          return item.uuid === this.activeId
        })
        console.log(tab)
        this.closeTab(tab)
      },
      uuid () {
        let S4 = _ => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
      },
      /*
       * 检查当前路由是否有tab栏及对应操作
       *
       * todo 根据业务方性能限制开启条数
       * */
      checkRoute () {
        let {name, fullPath, params, meta, query} = this.$route
        if (fullPath === '/') return
        let pageIndex = this.tabs.findIndex(tab => {
          return meta.multiOpen ? fullPath === tab.fullPath : name === tab.name // meta.multi 判断页面是否支持多开
        })
        let tab = {fullPath, params, name, query}
        // 根据页面不同type类型获取页面名称
        let pageName = (typeof meta.pageName === 'string' || !meta.pageName) ? meta.pageName : params.type ? meta.pageName[params.type] : meta.pageName['default']
        if (pageIndex < 0) {
          tab.uuid = this.uuid()
          tab.pageName = pageName
          this.tabs.push(tab)
        } else {
          if (!meta.multiOpen) {
            tab = this.tabs[pageIndex]
            tab.fullPath = fullPath
            tab.params = params
            tab.query = query
            tab.pageName = pageName
          }
          tab = this.tabs[pageIndex]
        }
        this.activeId = tab.uuid
        this.updateSession()
        if (this.tabs.length > 15) {
          util.message({message: 'tab页不能超过15个,请关闭多余tab页'})
          this.removeTab()
        }
      },
      /*
      * 将页面添加到keepAlive
      * 根据路由meta.notKeepAlive属性是否缓存页面
      * */
      addIncludesAlive () {
        let {name, meta} = this.$route
        if (meta && meta.keepAlive) {
          let index = this.includesAlive.findIndex(includeName => includeName === name)
          if (index < 0) this.includesAlive.push(name)
        }
      },
      /*
      * 将页面从keepAlive数组删除，从而销毁缓存实例
      * */
      deleteIncludesAlive (name) {
        console.log(name)
        let index = this.includesAlive.findIndex(includeName => includeName === name)
        if (index > -1) this.includesAlive.splice(index, 1)
      },
      /*
      * 更新当前tab状态到session
      * */
      updateSession () {
        sessionStorage.removeItem('coPageTabs')
        let {tabs, activeId, includesAlive} = this
        sessionStorage.setItem('coPageTabs', JSON.stringify({tabs, activeId, includesAlive}))
      },
      /*
      * 获取session数据
      * */
      init () {
        let tabObj = JSON.parse(sessionStorage.getItem('coPageTabs')) || {}
        for (let key in tabObj) {
          this[key] = tabObj[key]
        }
      },
      /*
      * 切换系统时清空tab栏
      * */
      changeSys () {
        this.tabs = []
        this.activeId = ''
        this.includesAlive = []
        sessionStorage.removeItem('coPageTabs')
      }
    },
    watch: {
      $route: {
        handler (route, oldRoute) {
          this.addIncludesAlive()
          this.checkRoute(route)
        },
        deep: true
      }
    },
    created () {
      this.init()
    },
    computed: {
      showTransition: function () {
        let name = this.$route.name ? this.$route.name.toLowerCase() : 'none'
        return name.indexOf('print') < 0
      }
    }
  }
</script>

<style scoped lang="scss">
  #co-page-tabs {
    width: 100%;
    height: calc(100% - 10px);
    .co-page-tab{
      height: 34px;
      overflow: hidden;
      width: 100%;
      position: relative;
      .page-tabs-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        /*border-bottom: 4px solid #eee;*/
        height: 40px;
        overflow-y: auto;
        position: relative;
        &::-webkit-scrollbar {
          height: 6px;
        }
        &::after{
          content: '';
          height: 4px;
          width: 100%;
          background: #eee;
          position: absolute;
          bottom: 0px;
          left: 0;
        }
        li {
          flex: 1;
          max-width: 200px;
          height: 30px;
          background: #f2f2f2;
          display: flex;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          position: relative;
          border-radius: 8px 8px 0 0;
          transition: all .5s;
          span {
            flex: 1;
            overflow: hidden; /*超出部分隐藏*/
            white-space: nowrap; /*不换行*/
            text-overflow: ellipsis; /*超出部分文字以...显示*/
          }
          i {
            display: block;
            width: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            &:hover {
              color: #19bf4f;
              background: #ddd;
              border-radius: 50%;
            }
          }
          &:hover {
            background: #effde8;
          }
          &::after {
            content: '';
            width: 100%;
            height: 4px;
            background: #19bf4f;
            opacity: 0;
            position: absolute;
            bottom: -4px;
            left: 0;
            transition: all 0.5s;
            z-index: 1;
          }
          &.active {
            background: #fff;
            &::after {
              opacity: 1;
            }
          }
          &.page-close-all {
            max-width: 35px;
            transition: all 0.5s;
            tag {
              display: none;
            }
            &.active {
              &::after {
                background: #FFBD25;
              }
            }
            &:hover {
              content: '关闭全部';
              max-width: 80px;
              background: #FFBD25;
              tag {
                display: inline-block;
              }
              i {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
