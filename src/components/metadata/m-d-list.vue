<template>
  <div class="m-d-list c-container">
    <div class="c-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item label="服务名称" class="c-query-input">
              <el-input v-model="queryCondition.serviceName" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务版本" class="c-query-input">
              <el-input v-model="queryCondition.methodName" placeholder="支持模糊搜索"></el-input>
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
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <el-button type="primary" @click="importClick">导入</el-button> -->
        </el-upload>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="80" prop="id"></el-table-column>
        <el-table-column align='center' label="服务简称" min-width="100" prop="simpleService"></el-table-column>
        <el-table-column align='center' label="服务全称" min-width="100" prop="method"></el-table-column>
        <el-table-column align='center' label="版本信息" min-width="100" prop="requestType"></el-table-column>
        <el-table-column align='center' label="接口数量" min-width="300" prop="url" show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryDetails(scope.row)">查看详情</el-button>
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
      title="查看详情"
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
    </el-dialog>
  </div>
</template>

<script>
import * as crud from "../../api/api"
import util from "../../assets/js/co-util"

export default {
  name: "m-d-list",
  data () {
    return {
      queryCondition: {
        serviceName: null,
        methodName: null,
        pageRequest: crud.getQueryCondition()
      },
      record: {
        typeList: [
          {
            value: "get",
            label: "GET"
          },
          {
            value: "post",
            label: "POST"
          }
        ]
      },
      tableData: [],
      methodForm: {},
      rules: {},
      dialogVisible:false
    }
  },
  methods: {
    getMethodList () {
      const serviceId = this.$route.params.id
      let { serviceName, methodName, pageRequest } = this.queryCondition
      let request = {
        serviceId,
        serviceName,
        methodName,
        pageRequest
      }
      util.dealNullQueryCondition(request)
      console.log("getMethodList request:", request)
      crud
        .post({
          service: "admin/listInterfaces",
          dealException: true,
          data: request
        })
        .then(res => {
          const data = res.data
          if (
            data.status === 1 &&
            JSON.stringify(data.success.methodList) !== "undefined"
          ) {
            this.tableData = data.success.methodList
            this.queryCondition.pageRequest = crud.getCurrentPage(
              data.success.pageResponse
            )
          }
        })
        .catch(error => {
          console.error("request admin/listInterfaces error:", error)
          util.message({
            message: error,
            type: "error"
          })
        })
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
      let { simpleService, method, requestType, url } = this.methodForm
      let request = {
        simpleService,
        method,
        requestType,
        url
      }
      console.log(request)
    },
    // 导入成功回调
    uploadSuccess () {
      
    },
    // 导入失败回调
    uploadError () {

    },
    // 查看详情
    queryDetails (row) {
      console.log(row)
      this.dialogVisible = true 
    },
    handleSizeChange (limit) {
      this.queryCondition.pageRequest.limit = limit
      this.queryCondition.pageRequest = crud.getQueryCondition(
        this.queryCondition.pageRequest
      )
      this.getMethodList()
    },
    handleCurrentChange (pageIndex) {
      this.queryCondition.pageRequest.pageIndex = pageIndex
      this.queryCondition.pageRequest = crud.getQueryCondition(
        this.queryCondition.pageRequest
      )
      this.getMethodList()
    }
  },
  created () {
    this.getMethodList()
  }
}
</script>

<style lang="scss">
.m-d-list {
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
