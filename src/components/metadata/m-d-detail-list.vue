<template>
  <div class="m-d-detail-list c-container">
    <div class="c-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item label="方法名称" class="c-query-input">
              <el-input v-model="queryCondition.methodName" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详情" class="c-query-input">
              <el-input v-model="queryCondition.detail" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="c-query-input">
            <div class="f-right">
              <el-button type="primary" @click="searchForm('queryCondition')">搜索</el-button>
              <el-button class="c-button__default" @click="resetForm('queryCondition')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="c-content">
      <el-tabs v-model.trim="activeName" type="card" >
        <!-- 第一个tab栏 -->
        <el-tab-pane label="接口信息" name="first">
          <span slot="label"><i class="el-icon-date"></i> 接口信息</span>

          <!-- 基本信息 -->
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">接口信息</div>

            <el-table :data="methodData" style="width: 100%" class="methodTable" border>

              <el-table-column align='center' label="序号" width="100" type="index"></el-table-column>
              <el-table-column align='left' label="方法名列表" min-width="100" prop="methodName"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align='center' label="简述" min-width="300" prop="describe">
                <template slot-scope="scope">
                  <pre><code v-html="scope.row.describe" v-highlight></code></pre>
                </template>
              </el-table-column>
              <el-table-column align='center' label="测试" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="updateMetadata(scope.row)"><i class="el-icon-star-on"/>
                  </el-button>
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
        </el-tab-pane>
        <!-- 第二个tab栏 -->
        <el-tab-pane label="结构体信息" name="second" :disabled="second">
          <span slot="label"><i class="el-icon-menu"></i> 结构体信息</span>

          <!-- 基本信息 -->
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">结构体信息</div>
            <el-table :data="structData" style="width: 100%">
              <el-table-column align='center' label="序号" width="100" type="index"></el-table-column>
              <el-table-column align='left' label="结构体列表" min-width="250" prop="simpleName"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align='center' label="简述" min-width="250" prop="version"></el-table-column>

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
        </el-tab-pane>
        <!-- 第三个tab栏 -->
        <el-tab-pane label="枚举信息" name="third" :disabled="third">
          <span slot="label"><i class="el-icon-setting"></i> 枚举信息</span>

          <!-- 基本信息 -->
          <div class="essential-information">
            <div class="ey-tittle-level2 m25">枚举信息</div>
            <el-table :data="enumData" style="width: 100%">
              <el-table-column align='center' label="序号" width="100" type="index"></el-table-column>
              <el-table-column align='left' label="枚举结构列表" min-width="300" prop="simpleName"
                               show-overflow-tooltip></el-table-column>
              <el-table-column align='center' label="简述" min-width="200" prop="version"></el-table-column>

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
        </el-tab-pane>
      </el-tabs>
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
  import * as crud from '../../api/api'
  import util from '../../assets/js/co-util'
  // import marked from 'marked'

  export default {
    name: 'm-d-detail-list',
    data () {
      return {
        activeName: 'first',
        second: false,
        third: false,
        queryCondition: {
          serviceName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        },
        record: {
          typeList: [
            {
              value: 'get',
              label: 'GET'
            },
            {
              value: 'post',
              label: 'POST'
            }
          ]
        },
        methodData: [],
        structData: [],
        enumData: [],
        methodForm: {},
        rules: {},
        dialogVisible: false,
        data: null
      }
    },
    methods: {
      //获取元数据接口方法
      getMetaMethodList () {
        const metadataId = this.$route.params.id
        let { methodName, detail, pageRequest } = this.queryCondition
        let request = {
          metadataId,
          methodName,
          detail,
          pageRequest
        }
        util.dealNullQueryCondition(request)
        crud
          .post({
            service: 'admin/listMetaDetailMethod',
            dealException: true,
            data: request
          })
          .then(res => {
            const data = res.data
            if (JSON.stringify(data.success.metaMethodList) !== 'undefined') {
              let {metaMethodList,pageResponse} = data.success
              this.methodData = metaMethodList
              this.queryCondition.pageRequest = crud.getCurrentPage(pageResponse)
              // this.highlightCode()
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/listMetadata error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition()
        this.getMetadataList()
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
        this.getMetaMethodList()
      },
      handleCurrentChange (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex
        this.queryCondition.pageRequest = crud.getQueryCondition(
          this.queryCondition.pageRequest
        )
        this.getMetaMethodList()
      }
    },
    activated () {
      this.getMetaMethodList()
    }
  }
</script>

<style lang="scss">
  .m-d-detail-list {
    .f-right {
      float: right;
    }
    .el-tab-pane {
      font-size: 20px;
      .methodTable{
        tbody{
          .cell{
            /*height: 300px;*/
            code{
            }
          }
        }
      }
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
    .el-table .cell {
      white-space: normal;
    }
  }
</style>
