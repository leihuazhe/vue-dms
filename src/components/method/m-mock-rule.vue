<template>
  <div class="m-mock-rule c-container">
    <div class="c-content">
      <el-row>
        <div class="ey-tittle-level2 m25">基本信息</div>
      </el-row>
      <el-form :inline="true" class="form-content">
        <el-row>
          <el-col :span="8" class="wrap">
            <el-form-item label="服务名称：">
              <span>{{ methodForm.serviceName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="wrap">
            <el-form-item label="接口名称：">
              <span>{{ methodForm.methodName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="c-content">
      <el-row>
        <div class="ey-tittle-level2 m25">Mock规则</div>
      </el-row>
      <div class="f-right">
        <el-button type="primary" @click="addMockDialogVisible = true">添加Mock规则</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="序号(优先级)" min-width="80" prop="aaaa"></el-table-column>
        <el-table-column align='center' label="Mock表达式" min-width="120" prop="bbbb"></el-table-column>
        <el-table-column align='center' label="返回数据" min-width="120" prop="dddd"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增Mock规则"
      :visible.sync="addMockDialogVisible"
      width="30%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="120px" label-position="right" :rules="rules" ref="MockRuleForm" :model="MockRuleForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务名称" class="dialog-form-item" prop="serviceName">
              <el-input v-model.trim="MockRuleForm.serviceName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口名称" class="dialog-form-item" prop="methodName">
              <el-input v-model.trim="MockRuleForm.methodName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口地址" class="dialog-form-item" prop="address">
              <el-input v-model.trim="MockRuleForm.address" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClick">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="mockType === 'view' ? '查看': '编辑'"
      :visible.sync="MockDialogVisible"
      width="80%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="120px" label-position="right" :rules="rules" ref="MockRuleForm" :model="MockRuleForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="Mock表达式:" class="dialog-form-item" prop="serviceName">
              <span v-if="mockType === 'view'">{{ editMockForm.MockJsonString }}</span>
              <v-jsoneditor v-else v-model="editMockForm.MockJson" :options="options" :plus="false" height="400px" @error="onError"></v-jsoneditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="返回数据:" class="dialog-form-item" prop="methodName">
              <span v-if="mockType === 'view'">{{ editMockForm.dataJsonString }}</span>
              <v-jsoneditor v-else v-model="editMockForm.dataJson" :options="options" :plus="false" height="400px" @error="onError"></v-jsoneditor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClick" v-if="mockType === 'edit'">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VJsoneditor from "v-jsoneditor/src/index";
export default {
  components: {
    VJsoneditor
  },
  data () {
    return {
      options: {
        mode: "code"
      },
      methodForm: {
        serviceName: "aaaa",
        methodName: "bbbbb"
      },
      tableData: [
        {
          aaaa: "108",
          MockJson: {
            body: {
              request: {
                reportType: [
                  "SHOPINCOMEDIFF_REPORT",
                  "SKU_RECEIVE_REPORT",
                  "SUPPLIER_ACCOUNT_DETAIL",
                  "SHOP_CHECKACCOUNT_REPORT",
                  "LOGISTICS_CHECKACCOUNT_REPORT",
                  "CIGARETTE_TRANS_REPORT",
                  "INCOMEDETAIL_REPORT",
                  "INVENTORY_DETAIL_REPORT",
                  "LOGISTICS_DETAIL_REPORT",
                  "SHOP_IOCTW_REPORT",
                  "RETIREMENT_REPORT",
                  "STORE_TURNOVER",
                  "PAY_SOURCE_DATA",
                  "SINGLE_GOODS_SALE",
                  "SHOP_BUSINESS_DAILY",
                  "SPOT_AMOUNT",
                  "LOGISTICS_BACK",
                  "MEMBER_BALANCE",
                  "MEMBER_COUPON",
                  "LOGISTICS_RETIREMENT_REPORT"
                ],
                exportUserId: 16619,
                pageParams: { start: 0, size: 10, results: 0, pageIndex: 1 }
              }
            }
          },
          MockJsonString: {
            body: {
              request: {
                reportType: [
                  "SHOPINCOMEDIFF_REPORT",
                  "SKU_RECEIVE_REPORT",
                  "SUPPLIER_ACCOUNT_DETAIL",
                  "SHOP_CHECKACCOUNT_REPORT",
                  "LOGISTICS_CHECKACCOUNT_REPORT",
                  "CIGARETTE_TRANS_REPORT",
                  "INCOMEDETAIL_REPORT",
                  "INVENTORY_DETAIL_REPORT",
                  "LOGISTICS_DETAIL_REPORT",
                  "SHOP_IOCTW_REPORT",
                  "RETIREMENT_REPORT",
                  "STORE_TURNOVER",
                  "PAY_SOURCE_DATA",
                  "SINGLE_GOODS_SALE",
                  "SHOP_BUSINESS_DAILY",
                  "SPOT_AMOUNT",
                  "LOGISTICS_BACK",
                  "MEMBER_BALANCE",
                  "MEMBER_COUPON",
                  "LOGISTICS_RETIREMENT_REPORT"
                ],
                exportUserId: 16619,
                pageParams: { start: 0, size: 10, results: 0, pageIndex: 1 }
              }
            }
          },
          dataJson: {
            body: {
              request: {
                reportType: [
                  "SHOPINCOMEDIFF_REPORT",
                  "SKU_RECEIVE_REPORT",
                  "SUPPLIER_ACCOUNT_DETAIL",
                  "SHOP_CHECKACCOUNT_REPORT",
                  "LOGISTICS_CHECKACCOUNT_REPORT",
                  "CIGARETTE_TRANS_REPORT",
                  "INCOMEDETAIL_REPORT",
                  "INVENTORY_DETAIL_REPORT",
                  "LOGISTICS_DETAIL_REPORT",
                  "SHOP_IOCTW_REPORT",
                  "RETIREMENT_REPORT",
                  "STORE_TURNOVER",
                  "PAY_SOURCE_DATA",
                  "SINGLE_GOODS_SALE",
                  "SHOP_BUSINESS_DAILY",
                  "SPOT_AMOUNT",
                  "LOGISTICS_BACK",
                  "MEMBER_BALANCE",
                  "MEMBER_COUPON",
                  "LOGISTICS_RETIREMENT_REPORT"
                ],
                exportUserId: 16619,
                pageParams: { start: 0, size: 10, results: 0, pageIndex: 1 }
              }
            }
          },
          dataJsonString: {
            body: {
              request: {
                reportType: [
                  "SHOPINCOMEDIFF_REPORT",
                  "SKU_RECEIVE_REPORT",
                  "SUPPLIER_ACCOUNT_DETAIL",
                  "SHOP_CHECKACCOUNT_REPORT",
                  "LOGISTICS_CHECKACCOUNT_REPORT",
                  "CIGARETTE_TRANS_REPORT",
                  "INCOMEDETAIL_REPORT",
                  "INVENTORY_DETAIL_REPORT",
                  "LOGISTICS_DETAIL_REPORT",
                  "SHOP_IOCTW_REPORT",
                  "RETIREMENT_REPORT",
                  "STORE_TURNOVER",
                  "PAY_SOURCE_DATA",
                  "SINGLE_GOODS_SALE",
                  "SHOP_BUSINESS_DAILY",
                  "SPOT_AMOUNT",
                  "LOGISTICS_BACK",
                  "MEMBER_BALANCE",
                  "MEMBER_COUPON",
                  "LOGISTICS_RETIREMENT_REPORT"
                ],
                exportUserId: 16619,
                pageParams: { start: 0, size: 10, results: 0, pageIndex: 1 }
              }
            }
          }
        }
      ],
      addMockDialogVisible: false,
      MockRuleForm: {},
      rules: {},
      mockType: "",
      MockDialogVisible: false,
      editMockForm: {}
    };
  },
  methods: {
    onError () {},
    saveClick () {
      console.log(this.json);
    },
    viewClick (row) {
      this.editMockForm = JSON.parse(JSON.stringify(row));
      this.MockDialogVisible = true;
      this.mockType = "view";
    },
    editClick (row) {
      this.editMockForm = JSON.parse(JSON.stringify(row));
      this.MockDialogVisible = true;
      this.mockType = "edit";
    }
  }
};
</script>

<style lang="scss">
.m-mock-rule {
  .f-right {
    float: right;
  }
  .method-dialog {
    .el-row {
      margin-bottom: 20px;
      .dialog-form-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 120px);
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
}
</style>
