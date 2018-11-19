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
              <el-autocomplete class="inline-input" v-model.trim="request.methodName"
                               :fetch-suggestions="querySearchMethod"
                               placeholder="请输入内容" @select="handleSelectMethod">
                <template slot-scope="{ item }">
                  <div class="name">{{ item }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="c-query-input">
            <div class="f-right">
              <el-button type="primary">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="left-table c-content">
      <el-tabs v-model.trim="activeTab" type="border-card">
        <!-- 第一个tab栏 -->
        <el-tab-pane label="示范报文" name="first">
          <span slot="label"><i class="el-icon-date"></i>示范报文</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">示范报文</div>

            <v-jsoneditor v-model="samplesMessage" :options="options" :plus="false" height="400px"
                          mode="code" ref="mockExpressEditor"
                          @error="onError">
            </v-jsoneditor>

          </div>
        </el-tab-pane>
        <!-- 第二个tab栏 -->
        <el-tab-pane label="JSON请求" name="second">
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
      <el-tabs v-model.trim="activeTab" type="card">
        <!-- 第一个tab栏 -->
        <el-tab-pane label="示范报文" name="first">
          <span slot="label"><i class="el-icon-date"></i>示范报文</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">示范报文</div>
          </div>
        </el-tab-pane>
        <!-- 第二个tab栏 -->
        <el-tab-pane label="JSON请求" name="second">
          <span slot="label"><i class="el-icon-menu"></i>JSON请求</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">JSON请求</div>
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
        activeTab: 'first',
        request: {
          parameter: null
        },
        samplesMessage: JSON.parse(`{
                           "body": {
                              "request": {
                                 "categoryId": 579,
                                 "skuName": "sampleDataString",
                                 "skuNameEn": "sampleDataString",
                                 "posname": "sampleDataString",
                                 "type": "NORMAL_SKU",
                                 "financeType": "EQUIPMENT_SKU",
                                 "primaryAttributes": "sampleDataString",
                                 "sellAttributes": "sampleDataString",
                                 "normalAttributes": "sampleDataString",
                                 "supplierRelateList": [
                                    {
                                       "id": 670,
                                       "supplierNo": "sampleDataString",
                                       "isPrimarySupplier": "true",
                                       "flag": 673,
                                       "modifyType": "DELETE",
                                       "sellingPrice": 27.500414521805872,
                                       "buyingPrice": 20.707692224902765,
                                       "supplierInputTax": 41.77495843137648,
                                       "districtValue": "sampleDataString",
                                       "districtName": "sampleDataString",
                                       "minOrderNum": 392,
                                       "minOrderTimes": 681,
                                       "maxOrderTimes": 13,
                                       "logisticsRelateList": [
                                          {
                                             "id": 629,
                                             "supplierLogisticsId": 963,
                                             "modifyType": "DELETE"
                                          },
                                          {
                                             "id": 975,
                                             "supplierLogisticsId": 730,
                                             "modifyType": "ADD"
                                          }
                                       ]
                                    },
                                    {
                                       "id": 463,
                                       "supplierNo": "sampleDataString",
                                       "isPrimarySupplier": "true",
                                       "flag": 876,
                                       "modifyType": "EDIT",
                                       "sellingPrice": 84.52044481358605,
                                       "buyingPrice": 43.095110366374676,
                                       "supplierInputTax": 7.885521828598341,
                                       "districtValue": "sampleDataString",
                                       "districtName": "sampleDataString",
                                       "minOrderNum": 42,
                                       "minOrderTimes": 42,
                                       "maxOrderTimes": 466,
                                       "logisticsRelateList": [
                                          {
                                             "id": 312,
                                             "supplierLogisticsId": 621,
                                             "modifyType": "DELETE"
                                          },
                                          {
                                             "id": 833,
                                             "supplierLogisticsId": 914,
                                             "modifyType": "DELETE"
                                          }
                                       ]
                                    }
                                 ],
                                 "skuBarcodeItemList": [
                                    {
                                       "id": 667,
                                       "skuId": 672,
                                       "packingSize": 759,
                                       "type": "BOX_BARCODE",
                                       "property": "INTERNATIONAL_BARCODE",
                                       "standard": "EAN8",
                                       "barcode": "sampleDataString",
                                       "length": 668,
                                       "width": 483,
                                       "height": 591,
                                       "weight": 511,
                                       "flag": 214,
                                       "modifyType": "DELETE",
                                       "packingSpec": "sampleDataString",
                                       "packingMult": 514,
                                       "remark": "sampleDataString",
                                       "districtValues": "sampleDataString",
                                       "districtNames": "sampleDataString"
                                    },
                                    {
                                       "id": 31,
                                       "skuId": 558,
                                       "packingSize": 653,
                                       "type": "BOX_BARCODE",
                                       "property": "IN_STORE_BARCODE",
                                       "standard": "EAN13",
                                       "barcode": "sampleDataString",
                                       "length": 413,
                                       "width": 980,
                                       "height": 239,
                                       "weight": 983,
                                       "flag": 487,
                                       "modifyType": "ADD",
                                       "packingSpec": "sampleDataString",
                                       "packingMult": 770,
                                       "remark": "sampleDataString",
                                       "districtValues": "sampleDataString",
                                       "districtNames": "sampleDataString"
                                    }
                                 ],
                                 "channel": "NB",
                                 "brand": "sampleDataString",
                                 "spec": "sampleDataString",
                                 "saleUnit": "sampleDataString",
                                 "shelflife": 241,
                                 "shelflifeUnit": "HOUR",
                                 "inStockStandard": 352,
                                 "outStockStandard": 870,
                                 "stockStandardUnit": "DAY",
                                 "shippingMethodValue": "sampleDataString",
                                 "flag": 784,
                                 "categoryCode": "sampleDataString",
                                 "headquarterEffectiveDate": 800,
                                 "storeEffectiveDate": 648,
                                 "outputTax": 73.8869176595779,
                                 "logisticsOutputTax": 82.87580427031236,
                                 "machineMaterials": [
                                    {
                                       "id": 553,
                                       "materialSkuId": 695,
                                       "materialSkuNo": "sampleDataString",
                                       "useCount": 1.5486193412313387,
                                       "useUnit": "sampleDataString",
                                       "operateTypeEnum": "EDIT"
                                    },
                                    {
                                       "id": 895,
                                       "materialSkuId": 874,
                                       "materialSkuNo": "sampleDataString",
                                       "useCount": 12.730524970606872,
                                       "useUnit": "sampleDataString",
                                       "operateTypeEnum": "EDIT"
                                    }
                                 ]
                              }
                           }
                        }`),
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

      //request for api test
      requestForTest () {
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
              util.message({
                message: result + ':' + responseType,
                type: 'success'
              })
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


      }
    },
    activated () {
      this.getServiceNameList()
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
      .f-right {
        float: right;
        margin-top: 10px;
      }
    }

  }

</style>
