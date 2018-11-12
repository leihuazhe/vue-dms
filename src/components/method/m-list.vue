<template>
  <div class="m-list c-container">
    <div class="c-header">
      <el-collapse @change="collapseHandler" v-model="expandName">
        <el-collapse-item :title="searchArr" name="1">
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
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="c-content">
      <div class="f-right">
        <el-button type="primary" @click="addMethod">添加接口信息</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="80" prop="id"></el-table-column>
        <el-table-column align='center' label="服务名称" min-width="120" prop="simpleService"></el-table-column>
        <el-table-column align='center' label="接口名称" min-width="120" prop="method"></el-table-column>
        <el-table-column align='center' label="请求类型" min-width="120" prop="requestType"></el-table-column>
        <el-table-column align='center' label="接口地址" min-width="120" prop="url"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryMockRule(scope.row)">查看Mock规则</el-button>
            <el-button type="text" size="small" @click="modifyMockRule(scope.row)">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
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
      width="30%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="right" :rules="rules"
               ref="methodForm" :model="methodForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务名称" class="dialog-form-item" prop="serviceName">
              <el-input v-model.trim="methodForm.serviceName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口名称" class="dialog-form-item" prop="methodName">
              <el-input v-model.trim="methodForm.methodName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="请求类型" class="dialog-form-item" prop="type">
              <el-select v-model="methodForm.type">
                <el-option v-for="item in record.typeList" :value="item.value" :label="item.label"
                           :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="接口地址" class="dialog-form-item" prop="address">
              <el-input v-model.trim="methodForm.address" placeholder="请输入内容"></el-input>
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
  import ListMixin from '../mixin/m-list';
  import * as crud from '../../api/api';
  import util from '../../assets/js/co-util'

  export default {
    mixins: [ListMixin],
    name: 'm-list',
    data () {
      return {
        tableData: [],
        queryCondition: {
          simpleName: null,
          method: null,
          pageRequest: crud.getQueryCondition()
        },
        dialogVisible: false,
        methodForm: {},
        rules: {}
      };
    },
    methods: {
      getMethodList () {
        let {serviceName, methodName, pageRequest} = this.queryCondition
        let request = {
          serviceName,
          methodName,
          pageRequest
        }
        request.pageRequest.sortFields = 'created_at desc'
        util.dealNullQueryCondition(request)
        crud.post({
          service: 'admin/listInterfaces',
          dealException: true,
          data: request
        })
          .then(res => {
            const data = res.data;
            if (data.status === 1 && JSON.stringify(data.success.methodList) !== 'undefined') {
              this.tableData = data.success.methodList;
              this.queryCondition.pageRequest = crud.getCurrentPage(data.success.pageResponse);
            }
          })
          .catch(error => {
            console.error('request admin/listInterfaces error:', error);
          });
      },


      queryMockRule () {
        this.$router.push({ name: 'm-mock-rule' });
      },

      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition();
        this.getMethodList();
      },
      resetForm () {
        this.tableData = [];
        this.queryCondition = {
          simpleName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        };
        this.searchForm();
      },

      searchClick () {
        this.search();
      },
      search () {
        let { service, method } = this.queryCondition;
      },
      saveClick () {
        let { serviceName, methodName, type, address } = this.methodForm;
        let request = {
          serviceName,
          methodName,
          type,
          address
        };
        console.log(request);
      },
      addMethod () {
        this.dialogVisible = true;
      },
      modifyMockRule (row) {

      },

      handleSizeChange (limit) {
        this.queryCondition.pageRequest.limit = limit;
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest);
        this.getMethodList();
      },
      handleCurrentChange (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex;
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest);
        this.getMethodList();
      }
    },

    created () {
      this.getMethodList();
    }
  };
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
