<template>
  <div class="m-mock-rule c-container">
    <div class="c-content">
      <el-row>
        <div class="ey-tittle-level2 m25">基本信息</div>
      </el-row>
      <el-form :inline="true" class="form-content">
        <el-row>
          <el-col :span="12" class="wrap">
            <el-form-item label="服务名称">
              <span>{{ methodForm.serviceName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="wrap">
            <el-form-item label="接口名称">
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
        <el-button type="primary" @click="addMock">添加Mock规则</el-button>
        <el-button type="primary" @click="sortClick">{{editStatus?'保存':'修改顺序'}}</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="序号" width="60">
          <template slot-scope="scope">
            <el-input v-model="scope.row.index" @change="inputIndex($event,scope.row)" v-if="editStatus"></el-input>
            <span v-else>{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column align='center' label="Mock表达式" min-width="120" prop="mockExpress"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="返回数据" min-width="120" prop="data"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="优先级" min-width="120" prop="sort"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="modifyClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteMockInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryCondition.pageRequest.pageIndex"
                       :page-sizes="[5, 10, 20, 30, 40]"
                       :page-size="queryCondition.pageRequest.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="queryCondition.pageRequest.results">
        </el-pagination>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog
      :title="mockType === 'view' ? '查看': '编辑'"
      :visible.sync="MockDialogVisible"
      width="80%"
      custom-class="mock-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="120px" label-position="top" :rules="rules"
               ref="editMockForm" :model="editMockForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="12">
            <el-form-item label="Mock表达式:" class="dialog-form-item" prop="mockExpress">
              <!--<span v-if="mockType === 'view'">{{ editMockForm.mockExpress }}</span>-->
              <v-jsoneditor v-model="editMockForm.mockExpress" :options="options" :plus="false" height="150px"
                            mode="code" ref="mockExpressEditor"
                            @error="onError" class="mockEditor"></v-jsoneditor>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返回数据:" class="dialog-form-item" prop="data">
              <v-jsoneditor v-model="editMockForm.data" :options="options" :plus="false" height="150px"
                            mode="code" ref="dataEditor"
                            @error="onError" class="mockEditor"></v-jsoneditor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMockClick" v-if="mockType !== 'view'">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VJsoneditor from "v-jsoneditor/src/index"
import * as crud from "../../api/api"
import util from "../../assets/js/co-util"

export default {
  components: {
    VJsoneditor
  },
  name: 'm-mock-rule',
  data () {
    return {
      editStatus: false,
      queryCondition: {
        methodId: null,
        pageRequest: crud.getQueryCondition()
      },
      options: {
        mode: "code"
      },
      methodForm: {
        serviceName: null,
        methodName: null
      },
      tableData: [],
      rules: {},
      mockType: "",
      MockDialogVisible: false,
      editMockForm: {
        mockExpress: null,
        data: null
      }
    }
  },
  methods: {
    sortClick () {
      this.editStatus = !this.editStatus
      if (this.editStatus) {
        this.tableData.forEach((item, index) => (item.index = index))
      } else {
        // 保存逻辑
        let priorityList = this.tableData.map(item => item.id)
        crud
          .post({
            service: "admin/updatePriority",
            dealException: true,
            data: { priorityList }
          })
          .then(res => {
            util.message({ type: "success", message: "修改成功" })
            this.getMockList()
          })
          .catch(error => {
            util.message("修改失败")
            this.getMockList()
          })
      }
    },
    render () {
      this.queryCondition.methodId = Number(this.$route.params.id)
      this.getMethodForm(this.queryCondition.methodId)
      this.getMockList()
    },
    getMethodForm (id) {
      crud
        .post({
          service: "admin/getMockMethodForm",
          dealException: true,
          data: { id }
        })
        .then(res => {
          const data = res.data
          if (
            data.status === 1 &&
            JSON.stringify(data.success.serviceName) !== "undefined"
          ) {
            this.methodForm.serviceName = data.success.service
            this.methodForm.methodName = data.success.method
          } else {
            util.message({
              message: data.responseMsg,
              type: "error"
            })
          }
        })
        .catch(error => {
          console.error("request admin/getMockMethodForm error:", error)
          util.message({
            message: error,
            type: "error"
          })
        })
    },
    getMockList () {
      this.editStatus = false
      let { methodId, pageRequest } = this.queryCondition
      let request = {
        methodId,
        pageRequest
      }
      util.dealNullQueryCondition(request)
      crud
        .post({
          service: "admin/listMockExpress",
          dealException: true,
          data: request
        })
        .then(res => {
          const data = res.data
          if (
            data.status === 1 &&
            JSON.stringify(data.success.mockList) !== "undefined"
          ) {
            this.tableData = data.success.mockList
            this.queryCondition.pageRequest = crud.getCurrentPage(
              data.success.pageResponse
            )
          } else {
            util.message({
              message: data.responseMsg,
              type: "error"
            })
          }
        })
        .catch(error => {
          console.error("request admin/listMockExpress error:", error)
          util.message({
            message: error,
            type: "error"
          })
        })
    },
    onError () {
      console.log("error")
    },
    resetForm () {
      this.tableData = []
      this.getMockList()
    },
    saveMockClick () {
      let { id } = this.editMockForm
      let { methodId } = this.queryCondition
      let mockExpress = ""
      let data = ""
      try {
        // mockExpress  = JSON.stringify(this.$refs.mockExpressEditor.editor.content.innerText.trim())
        mockExpress = this.$refs.mockExpressEditor.editor.get()
        data = this.$refs.dataEditor.editor.get()
      } catch (e) {
        util.message("JSON格式错误")
        return
      }
      let request = {
        methodId,
        mockId: id,
        mockExpress: JSON.stringify(mockExpress),
        mockData: JSON.stringify(data)
      }
      util.dealNullQueryCondition(request)
      console.log(request)
      let service = this.mockType === 'add' ? 'admin/createMockInfo' : 'admin/updateMockInfo'
      let message = this.mockType === 'add' ? 'Mock规则创建成功' : 'Mock规则修改成功'
      crud
        .post({
          service,
          dealException: true,
          data: request
        })
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            util.message({
              type: "success",
              message
            })
            //刷新
            this.MockDialogVisible = false
            this.resetForm()
          } else {
            util.message({
              message: data.responseMsg,
              type: "error"
            })
          }
        })
        .catch(error => {
          console.error("request admin/listMockExpress error:", error)
          util.message({
            message: error,
            type: "error"
          })
        })
    },
    viewClick (row) {
      this.editMockForm = JSON.parse(JSON.stringify(row))
      this.editMockForm.data = JSON.parse(this.editMockForm.data)
      this.editMockForm.mockExpress = JSON.parse(this.editMockForm.mockExpress)
      this.MockDialogVisible = true
      this.mockType = "view"
    },
    modifyClick (row) {
      this.editMockForm = JSON.parse(JSON.stringify(row))
      this.editMockForm.mockExpress = JSON.parse(this.editMockForm.mockExpress)
      this.editMockForm.data = JSON.parse(this.editMockForm.data)
      this.MockDialogVisible = true
      this.mockType = "modify"
    },
    addMock () {
      this.editMockForm = {
        mockExpress: {},
        data: {}
      }
      this.MockDialogVisible = true
      this.mockType = "add"
    },
    //分页 function
    handleSizeChange (limit) {
      this.queryCondition.pageRequest.limit = limit
      this.queryCondition.pageRequest = crud.getQueryCondition(
        this.queryCondition.pageRequest
      )
      this.getMockList()
    },
    handleCurrentChange (pageIndex) {
      this.queryCondition.pageRequest.pageIndex = pageIndex
      this.queryCondition.pageRequest = crud.getQueryCondition(
        this.queryCondition.pageRequest
      )
      this.getMockList()
    },
    deleteMockInfo (row) {
      util.confirm("是否删除该接口？", this.del, row.id)
    },
    del (id) {
      crud
        .post({
          service: "admin/deleteMockInfo",
          dealException: true,
          data: { id }
        })
        .then(res => {
          let { status, responseMsg } = res.data
          if (status === 1) {
            /*util.message({
                message: '删除成功',
                type: 'success'
              })*/
            this.resetForm()
          } else {
            util.message({
              message: responseMsg,
              type: "error"
            })
          }
        })
        .catch(error => {
          console.error("request admin/deleteInterface error:", error)
        })
    },
    inputIndex (value, row) {
      let index = this.tableData.findIndex(item => item.id === row.id)
      this.tableData.splice(index, 1)
      value =
        value < 0
          ? 0
          : value > this.tableData.length
            ? this.tableData.length
            : value
      this.tableData.splice(value, 0, row)
    }
  },
  activated () {
    this.render()
  }
}
</script>

<style lang="scss">
.m-mock-rule {
  .f-right {
    float: right;
  }
  .mock-dialog {
    .el-row {
      .mockEditor{
        height: 400px !important;
      }
      margin-bottom: 5px;
      .dialog-form-item {
        width: 100%;
        .el-form-item__content {
          width: calc(100% - 80px);
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
