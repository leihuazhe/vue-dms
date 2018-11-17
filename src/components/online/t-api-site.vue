<template>
  <div class="t-api-site c-container">
    <div class="left-table c-content">
      <el-tabs v-model.trim="activeTab" type="border-card">
        <!-- 第一个tab栏 -->
        <el-tab-pane label="示范报文" name="first">
          <span slot="label"><i class="el-icon-date"></i>示范报文</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">示范报文</div>
            <!--文本框-->
            <!--<json-viewer class="json-viewer"
              :value="samplesMessage"
                         :expand-depth=5
                         copyable
                         boxed
                         sort></json-viewer>-->

            <v-jsoneditor v-model="samplesMessage" :options="options" :plus="false" height="400px"
                          mode="code" ref="mockExpressEditor"
                          @error="onError"></v-jsoneditor>
            <!-- <div class="api-input">
               <el-input
                 type="textarea"
                 :rows="20"
                 v-model="samplesMessage">
               </el-input>
             </div>-->
          </div>
        </el-tab-pane>
        <!-- 第二个tab栏 -->
        <el-tab-pane label="JSON请求" name="second">
          <span slot="label"><i class="el-icon-menu"></i>JSON请求</span>
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">JSON请求</div>
            <div class="api-input">
              <el-input size="large" v-model="samplesMessage">
              </el-input>
            </div>
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

  export default {
    components: {
      VJsoneditor
    },
    name: 't-api-site',
    data () {
      return {
        activeTab: 'first',
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
        }
      }
    },
    methods: {},
    created () {
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
  }

</style>
