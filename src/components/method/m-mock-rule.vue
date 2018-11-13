<template>
  <div class="m-mock-rule c-container">
    <div class="c-content">
      <el-row>
        <div class="ey-tittle-level2 m25">基本信息</div>
      </el-row>
      <el-form :inline="true" class="form-content">
        <el-row>
          <el-col :span="8" class="wrap">
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
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="序号" width="80" type="index"></el-table-column>
        <el-table-column align='center' label="Mock表达式" min-width="120" prop="mockExpress"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="返回数据" min-width="120" prop="data"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="优先级" min-width="120" prop="sort"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--弹出框-->
    <el-dialog
      :title="mockType === 'view' ? '查看': '编辑'"
      :visible.sync="MockDialogVisible"
      width="90%"
      custom-class="mock-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="120px" label-position="top" :rules="rules"
               ref="editMockForm" :model="editMockForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="12">
            <el-form-item label="Mock表达式:" class="dialog-form-item" prop="mockExpress">
              <span v-if="mockType === 'view'">{{ editMockForm.mockExpress }}</span>
              <v-jsoneditor v-else v-model="editMockForm.mockExpress" :options="options" :plus="false" height="400px"
                            @error="onError"></v-jsoneditor>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返回数据:" class="dialog-form-item" prop="data">
              <span v-if="mockType === 'view'">{{ editMockForm.data }}</span>
              <v-jsoneditor v-else v-model="editMockForm.data" :options="options" :plus="false" height="400px"
                            @error="onError"></v-jsoneditor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMockClick" v-if="mockType === 'edit'">保存</el-button>
      </span>
    </el-dialog>
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
    data () {
      return {
        queryCondition: {
          methodId: null,
          pageRequest: crud.getQueryCondition()
        },
        options: {
          mode: 'code'
        },
        methodForm: {
          serviceName: {},
          methodName: {}
        },
        tableData: [],
        rules: {},
        mockType: '',
        MockDialogVisible: false,
        editMockForm: {
          mockExpress: null,
          data: null
        }
      }
    },
    methods: {
      render () {
        this.queryCondition.methodId = this.$route.params.id
        this.getMethodForm(this.queryCondition.methodId)
        this.getMockList()
      },
      getMethodForm (id) {
        crud.post({
          service: 'admin/getMockMethodForm',
          dealException: true,
          data: {id}
        })
          .then(res => {
            const data = res.data
            if (data.status === 1 && JSON.stringify(data.success.serviceName) !== 'undefined') {
              this.methodForm.serviceName = data.success.service
              this.methodForm.methodName =  data.success.method
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/getMockMethodForm error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },

      getMockList () {
        let { methodId, pageRequest } = this.queryCondition
        let request = {
          methodId,
          pageRequest
        }
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/listMockExpress',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1 && JSON.stringify(data.success.mockList) !== 'undefined') {
              this.tableData = data.success.mockList
              this.queryCondition.pageRequest = crud.getCurrentPage(data.success.pageResponse)
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/listMockExpress error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },

      onError () {
      },

      saveMockClick () {
        console.log(this.json)
        let {mockExpress, data} = this.editMockForm
        let methodId = this.queryCondition.methodId
        let request = {
          methodId: methodId,
          mockExpress: JSON.stringify(mockExpress),
          mockData: JSON.stringify(data)
        }
        console.log(request)
        crud.post({
          service: 'admin/createMockInfo',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              util.message({
                type: 'success',
                message: '创建Mock规则成功'
              })
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/listMockExpress error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      viewClick (row) {
        this.editMockForm = JSON.parse(JSON.stringify(row))
        this.MockDialogVisible = true
        this.mockType = 'view'
      },
      editClick (row) {
        this.editMockForm = JSON.parse(JSON.stringify(row))
        this.editMockForm.mockExpress = JSON.parse(this.editMockForm.mockExpress)
        this.editMockForm.data = JSON.parse(this.editMockForm.data)
        this.MockDialogVisible = true
        this.mockType = 'edit'
      },
      addMock () {
        this.editMockForm = {
          mockExpress: {},
          data: {}
        }
        this.MockDialogVisible = true
        this.mockType = 'edit'
      },

      // 点击角色保存
      clickSaveMock (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let demo = JSON.parse(JSON.stringify(this.roleForm))
            this.deleteKey.forEach(ele => {
              delete demo[ele]
            })
            for (const i in demo) {
              if (!demo[i]) delete demo[i]
            }
            if (this.roleForm.type === 'add') {
              api.AdminService.createRole({
                method: 'createRole',
                data: {
                  request: demo
                },
                success: res => {
                  util.message({
                    type: 'success',
                    message: '创建角色成功'
                  })
                  this.dialogRoleForm = false
                  this.listRole()
                }
              })
            } else if (this.roleForm.type === 'modify') {
              // this.$set(this.roleList, this.roleForm.index, this.roleForm)
              api.AdminService.modifyRole({
                data: {
                  request: demo
                },
                success: res => {
                  util.message({
                    type: 'success',
                    message: '修改角色成功'
                  })
                  this.dialogRoleForm = false
                  this.listRole()
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },

    created () {
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
        margin-bottom: 20px;
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
