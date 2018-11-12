<template>
  <div class="m-list c-container">
    <div class="c-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item label="服务名称" class="c-query-input">
              <el-input v-model="queryCondition.serviceName" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接口名称" class="c-query-input">
              <el-input v-model="queryCondition.methodName" placeholder="请输入服务方法名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="f-right">
              <el-button type="primary" @click="searchForm('queryCondition')">搜索</el-button>
              <el-button class="c-button__default" @click="resetForm('queryCondition')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="c-content">
      <div class="f-right">
        <el-button type="primary" @click="addMethod">添加接口信息</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="80" prop="id"></el-table-column>
        <el-table-column align='center' label="服务名称" min-width="100" prop="simpleService"></el-table-column>
        <el-table-column align='center' label="接口名称" min-width="100" prop="method"></el-table-column>
        <el-table-column align='center' label="请求类型" min-width="100" prop="requestType"></el-table-column>
        <el-table-column align='center' label="接口地址" min-width="300" prop="url" show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryMockRule(scope.row)">查看Mock规则</el-button>
            <el-button type="text" size="small" @click="modifyMethod(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteMethod(scope.row)">删除</el-button>
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
    <el-dialog
      title="新增接口"
      :visible.sync="dialogVisible"
      width="40%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="right" :rules="rules"
               ref="methodForm" :model="methodForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务名称" class="dialog-form-item" prop="simpleService">
              <el-input v-model.trim="methodForm.simpleService" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口名称" class="dialog-form-item" prop="method">
              <el-input v-model.trim="methodForm.method" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="请求类型" class="dialog-form-item" prop="requestType">
              <el-select v-model="methodForm.requestType">
                <el-option v-for="item in record.typeList" :value="item.value" :label="item.label"
                           :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口地址" class="dialog-form-item" prop="url">
              <el-input v-model.trim="methodForm.url" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClick">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as crud from '../../api/api'
  import util from '../../assets/js/co-util'

  export default {
    name: 'm-list',
    data () {
      return {
        queryCondition: {
          serviceName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        },
        record: {
          typeList: [{
            value:'get',
            label: 'GET'
          }, {
            value: 'post',
            label: 'POST'
          }]
        },
        tableData: [],
        dialogVisible: false,
        methodForm: {},
        rules: {}
      }
    },
    methods: {
      getMethodList () {
        let {serviceName, methodName, pageRequest} = this.queryCondition
        let request = {
          serviceName,
          methodName,
          pageRequest
        }
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/listInterfaces',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data
            if (data.status === 1 && JSON.stringify(data.success.methodList) !== 'undefined') {
              this.tableData = data.success.methodList
              this.queryCondition.pageRequest = crud.getCurrentPage(data.success.pageResponse)
            }
          })
          .catch(error => {
            console.error('request admin/listInterfaces error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      queryMockRule (row) {
        const id = row.id
        this.$router.push({name: 'm-mock-rule',params: {id:id,service:row.simpleService,method:row.method}})
      },

      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition()
        this.getMethodList()
      },
      resetForm () {
        this.tableData = []
        this.queryCondition = {
          simpleName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        }
        this.searchForm()
      },
      saveClick () {
        let {simpleService, method, requestType, url} = this.methodForm
        let request = {
          simpleService,
          method,
          requestType,
          url
        }
        console.log(request)
      },
      addMethod () {
        this.dialogVisible = true
      },
      modifyMethod (row) {
        this.methodForm = JSON.parse(JSON.stringify(row))
        this.dialogVisible = true
      },
      handleSizeChange (limit) {
        this.queryCondition.pageRequest.limit = limit
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getMethodList()
      },
      handleCurrentChange (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getMethodList()
      },
      deleteMethod (row) {
        util.confirm("是否删除该接口？", this.del, row.id)
      },
      del (id) {
        crud.post({
          service: 'admin/deleteInterface',
          dealException: true,
          data: {id}
        })
          .then(res => {
            let {status, responseMsg} = res.data
            if (status === 1) {
              util.message({
                message: '删除成功',
                type: 'success'
              })
              this.getMethodList()
            } else {
              util.message({
                message: responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/deleteInterface error:', error)
          })
      }
    },
    created () {
      this.getMethodList()
    }
  }
</script>

<style lang="scss">
  .m-list {
    .f-right {
      float: right;
    }
    .method-dialog {
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
