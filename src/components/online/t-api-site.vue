<template>
  <div class="t-api-site c-container">
    <div class="c-header">
      <el-form :inline="true" class="request-form-inline">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item label="服务名称" class="dialog-form-item" prop="serviceName">
              <el-autocomplete class="inline-input" v-model.trim="request.serviceName"
                               :fetch-suggestions="querySearch"
                               placeholder="请输入内容" @select="handleSelect">
                <template slot-scope="{ item }">
                  <div class="name">{{ item }}</div>
                </template>
              </el-autocomplete>
              <!--<el-input v-model.trim="methodForm.simpleService" placeholder="请输入内容"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接口名称" class="dialog-form-item" prop="method">
              <!--<el-select v-model.trim="request.methodName" clearable placeholder="请选择方法名">
                <el-option
                  v-for="item in request.methodName"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>-->


              <el-autocomplete class="inline-input" v-model.trim="request.methodName"
                               :fetch-suggestions="querySearchMethod"
                               placeholder="请输入内容" @select="handleSelectMethod" @blur="methodBlur"
                               :disabled="!request.serviceName">
                <template slot-scope="{ item }">
                  <div class="name">{{ item }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="c-query-input">

            <div class="f-right">
              <el-button type="primary" @click="resetInput">清空</el-button>
              <el-button class="c-button__default" @click="oneKeyForMock">一键创建规则</el-button>

            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="left-table c-content">
      <el-tabs v-model.trim="activeTab" type="border-card" @tab-click="tabClick">
        <!-- 第一个tab栏 -->
        <el-tab-pane label="示范报文" name="first">
          <span slot="label"><i class="el-icon-date"></i>示范报文</span>
          <div class="essential-information">
            <!--<div class="ey-tittle-level2 m25">示范报文</div>-->

            <v-jsoneditor v-model="requestSamples" :options="options" :plus="false" height="400px"
                          mode="code" ref="mockExpressEditor"
                          @error="onError">
            </v-jsoneditor>

          </div>
        </el-tab-pane>
        <!-- 第二个tab栏 -->
        <el-tab-pane label="返回结果" name="second">
          <span slot="label"><i class="el-icon-menu"></i>JSON请求</span>
          <div class="essential-information">
            <!--<div class="ey-tittle-level2 m25">JSON请求</div>-->
            <!--request -->
            <v-jsoneditor v-model="request.parameter" :options="requestOpts" :plus="false" height="400px"
                          mode="code" ref="parameterEditor">
            </v-jsoneditor>


            <span slot="footer" class="request-footer">

               <div class="f-right">
                <el-button type="primary" @click="requestForTest">确定</el-button>
              </div>
            </span>


          </div>
        </el-tab-pane>
        <!-- 第三个tab栏 -->
        <el-tab-pane label="MOCK请求" name="third">
          <span slot="label"><i class="el-icon-setting"></i>MOCK请求</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">MOCK请求</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right-table c-content">
      <el-tabs v-model.trim="activeRigthTab" type="card">
        <!-- 第二个tab栏 -->
        <el-tab-pane label="JSON请求" name="four">
          <span slot="label"><i class="el-icon-menu"></i>返回结果</span>
          <!--response -->
          <v-jsoneditor v-model="response" :options="responseOpts" :plus="false" height="400px"
                        mode="code" ref="responseEditor">
          </v-jsoneditor>
        </el-tab-pane>
        <!-- 第三个tab栏 -->
        <el-tab-pane label="MOCK请求" name="five">
          <span slot="label"><i class="el-icon-setting"></i>MOCK请求</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">MOCK请求</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import VJsoneditor from 'v-jsoneditor/src/index'
  import * as crud from '../../api/api'
  import util from '../../assets/js/co-util'

  export default {
    components: {
      VJsoneditor
    },
    name: 't-api-site',
    data () {
      return {
        activeTab: 'second',
        activeRigthTab: 'four',
        request: {
          serviceName: null,
          methodName: null,
          parameter: null
        },
        response: null,
        requestSamples: JSON.parse(`{}`),
        queryCondition: {},
        tableData: [],
        metaDataForm: {},
        options: {
          mode: 'code',
          // modes: ['text', 'code'],
          onEditable: function (node) {
            if (!node.path) {
              // In modes code and text, node is empty: no path, field, or value
              // returning false makes the text area read-only
              return false
            }
          },
          onError: function (err) {
            alert(err.toString())
          },
          onModeChange: function (newMode, oldMode) {
            console.log('Mode switched from', oldMode, 'to', newMode)
          }
        },
        requestOpts: {
          mode: 'code'
          // modes: ['text', 'code']
        },
        responseOpts: {
          mode: 'code'
          // modes: ['text', 'code']
        },
        //及时数据搜索
        restaurants: [],
        restaurantMethods: []
      }
    },
    methods: {
      onError: function (err) {
        alert(err.toString())
      },
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },

      handleSelect (item) {
        this.request.serviceName = item
        this.getMethodList(item)
      },
      querySearchMethod (queryString, cb) {
        var restaurants = this.restaurantMethods
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },

      handleSelectMethod (item) {
        this.request.methodName = item
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.toLowerCase()
            .indexOf(queryString.toLowerCase()) > -1)
        }
      },
      methodBlur () {
        if (this.request.serviceName && this.request.methodName) {
          this.fetchRequestSamples()
        }
      },
      //tab event
      tabClick (tab) {
        let tabName = tab.name
        if (tabName === 'first') {
          this.fetchRequestSamples()
        }
      },
      fetchRequestSamples () {
        if (!this.request.serviceName && !this.request.methodName) {
          util.message({
            message: '请先填写服务和接口信息',
            type: 'warning'
          })
          return
        }
        let request = {
          serviceName: this.request.serviceName,
          methodName: this.request.methodName,
          version: '1.0.0'
        }
        crud.post({
          service: 'api/getRequestSamples',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              this.requestSamples = JSON.parse(data.success)
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/listServicesName error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },


      resetInput () {
        this.request.serviceName = null
        this.request.methodName = null
        this.restaurantMethods = null
      },

      //查询service信息
      getServiceNameList () {
        const id = ''
        let request = { id }
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/listServicesName',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              this.restaurants = data.success
              /*if (id) {
                this.searchName = this.restaurants[0]
                this.queryCondition.serviceName = this.searchName
              } else {
                this.queryCondition.serviceName = null
              }*/
            }
          })
          .catch(error => {
            console.error('request admin/listServicesName error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })

      },
      //查询接口信息
      getMethodList (serviceName) {
        let request = { serviceName }
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/listInterfacesName',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              this.restaurantMethods = data.success
            }
          })
          .catch(error => {
            console.error('request admin/listInterfacesName error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      //一键创建规则
      oneKeyForMock () {
        if (!this.request.serviceName && !this.request.methodName) {
          util.message({
            message: '请先填写服务和接口信息',
            type: 'warning'
          })
          return
        }
        let { serviceName, methodName } = this.request
        let request = {
          serviceName: serviceName,
          methodName: methodName
        }
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/createMockOnce',
          dealException: true,
          data: request
        })
          .then(res => {
            let { status, success, responseMsg } = res.data
            if (status === 1) {
              const id = success
              this.$router.push({
                name: 'm-mock-rule',
                params: { id }
              })
            } else {
              util.message({
                message: responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request api/createMockOnce error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })


      },
      //request for api test
      requestForTest () {
        if (!this.request.serviceName && !this.request.methodName) {
          util.message({
            message: '请先填写服务和接口信息',
            type: 'warning'
          })
          return
        }

        let parameter = ''
        try {

          parameter = this.$refs.parameterEditor.editor.get()
        } catch (e) {
          util.message('JSON格式错误')
          return
        }
        let { serviceName, methodName } = this.request
        let request = {
          serviceName: serviceName,
          methodName: methodName,
          version: '1.0.0',
          parameter: JSON.stringify(parameter)
        }
        crud.post({
          service: 'api/requestForApi',
          dealException: true,
          data: request
        })
          .then(res => {
            let { status, success, responseMsg } = res.data
            let result = success.result
            let responseType = success.responseType
            if (status === 1) {
              this.response = JSON.parse(success.result)
            } else {
              util.message({
                message: responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request api/requestForApi error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      fillInput () {
        let { serviceName, methodName } = this.$route.query
        if (serviceName && methodName) {
          this.request.serviceName = serviceName
          this.request.methodName = methodName
        } else {
          this.request.serviceName = null
          this.request.methodName = null
        }

      }
    },
    activated () {
      this.getServiceNameList()
      this.fillInput()
    }
  }
</script>

<style lang="scss">
  .t-api-site {
    .left-table {
      width: 48%;
      float: left;
      margin-right: 30px;
      height: 654px;
    }
    .right-table {
      width: calc(52% - 30px);
      float: left;
      height: 654px;
    }
    .json-viewer {
      overflow: scroll;
    }
    .request-form-inline {
      .el-row {
        margin-bottom: 20px;
        .dialog-form-item {
          width: 100%;
          .el-form-item__content {
            width: 100%;
            .el-autocomplete,
            .el-date-editor.el-input,
            .el-select {
              width: 100%;
            }
          }
        }
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }

    .request-footer {
      .f-left {
        float: left;
        margin-top: 10px;
      }
      .f-right {
        float: right;
        margin-top: 10px;
      }
    }

  }

</style>
