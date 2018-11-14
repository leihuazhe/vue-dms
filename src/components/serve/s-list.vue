<template>
  <div class="s-list c-container">
    <header class="c-header">
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline" label-position="left">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item class="c-query-select" label="服务简称">
                <el-input v-model="queryCondition.simpleName" placeholder="支持模糊搜索"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item class="c-query-select" label="服务版本">
                <el-input v-model="queryCondition.version" placeholder="请输入版本信息"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item class="c-query-select" label="服务ID">
              <el-input v-model.trim="queryCondition.serviceId" placeholder="请输入服务ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24" class="c-query-input">
            <div class="f-right">
              <el-button type="primary" @click="searchForm('queryCondition')">搜索</el-button>
              <el-button class="c-button__default" @click="resetForm('queryCondition')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </header>
    <div class="c-content">
      <div class="f-left">
        <div class="table-title-text">服务列表</div>
      </div>
      <div class="f-right">
        <el-button type="primary" @click="addService">新增服务</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="30" prop="serviceId"></el-table-column>
        <el-table-column align='center' label="服务简称" min-width="120" prop="simpleName"></el-table-column>
        <el-table-column align='center' label="服务全称" min-width="120" prop="service"></el-table-column>
        <el-table-column align='center' label="版本信息" min-width="60" prop="version"></el-table-column>
        <el-table-column align='center' label="元数据信息" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="lookMetadata(scope.row.id)">点击查看{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="Mock接口数量" min-width="120" prop="mockMethodSize"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="jumpToInterface(scope.row.serviceId)">查看接口</el-button>
            <el-button type="text" size="small" @click="modifyService(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteService(scope.row)">删除</el-button>
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
    <!--:title和 title 的区别-->
    <el-dialog :title="serviceForm.title" :visible.sync="dialogVisible" class="s-dialog" width="40%"
               custom-class="s-dialog">
      <el-form ref="serviceForm" :model="serviceForm" class="s-dialog" :inline="true"
               label-width="80px" label-position="right" :rules="rules">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务简称" class="dialog-form-item" prop="simpleName">
              <el-input v-model.trim="serviceForm.simpleName" placeholder="请输入服务简称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务全称" class="dialog-form-item" prop="service">
              <el-input v-model.trim="serviceForm.service" placeholder="请输入服务全称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务版本" class="dialog-form-item" prop="version">
              <el-input v-model.trim="serviceForm.version" placeholder="请输入服务版本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveService('serviceForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../../assets/js/co-util'
  import * as crud from '../../api/api'

  export default {
    name: 's-list',
    data () {
      return {
        tableData: [],
        queryCondition: {
          simpleName: null,
          version: null,
          serviceId: null,
          pageRequest: crud.getQueryCondition()
        },
        serviceForm: {},
        dialogVisible: false,
        rules: {}
      }
    },
    methods: {
      jumpToInterface (id) {
        this.$router.push({
          name: 'm-list',
          params: { id: id }
        })
        /*this.$router.push({
          path: '/m-list',
          query: { id: id }
        })*/
      },
      addService () {
        this.serviceForm = {
          title: '新增服务',
          type: 'add',
          simpleName: null,
          service: null,
          version: null
        }
        this.dialogVisible = true
        // this.$router.push({ name: 'SAdd' })
      },
      modifyService (data) {
        this.serviceForm = JSON.parse(JSON.stringify(data))
        this.serviceForm.title = '修改服务'
        this.dialogVisible = true
        // this.$router.push({ name: 'SModify' })
      },
      lookMetadata () {
        this.$router.push({ name: 'SMetadata' })
      },

      getServiceList () {
        const self = this
        const queryCondition = JSON.parse(JSON.stringify(this.queryCondition))
        for (let key in queryCondition) {
          if (!queryCondition[key]) {
            delete queryCondition[key]
          }
        }
        queryCondition.pageRequest.sortFields = 'created_at desc'
        const data = JSON.stringify(this.queryCondition)
        crud.post({
          service: 'admin/listServices',
          dealException: true,
          data: data
        })
          .then(res => {
            const data = res.data
            if (data.status === 1 && JSON.stringify(data.success.serviceList) !== 'undefined') {
              self.tableData = data.success.serviceList
              self.queryCondition.pageRequest = crud.getCurrentPage(data.success.pageResponse)
            }
          })
          .catch(error => {
            console.log('request admin/listServices error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },

      saveService (serviceForm) {
        this.$refs[serviceForm].validate(valid => {
          if (valid) {
            let service = JSON.parse(JSON.stringify(this.serviceForm))
            util.dealNullQueryCondition(service)
            if (this.serviceForm.type === 'add') {
              crud.post({
                service: 'admin/createService',
                dealException: true,
                data: service
              })
                .then(res => {
                  const data = res.data
                  if (data.status === 1 && JSON.stringify(data.success.serviceList) !== 'undefined') {
                    util.message({
                      type: 'success',
                      message: '创建角色成功'
                    })
                    this.dialogRoleForm = false
                    this.listRole()
                  }
                })
                .catch(error => {
                  console.log('request admin/createService error:', error)
                  util.message({
                    message: error,
                    type: 'error'
                  })
                })

            } else if (this.serviceForm.type === 'modify') {

            }


          } else {
            console.log('error submit!!')
            return false
          }

        })
      },
      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition()
        /* let flag = this.queryCondition.simpleName || this.queryCondition.version || this.queryCondition.serviceId;
         if (flag) {
           this.getServiceList();
         } else {
           util.message('查询输入项至少填写一个查询条件', 2500);
         }*/
        this.getServiceList()
      }
      ,
      resetForm () {
        this.tableData = []
        this.queryCondition = {
          simpleName: null,
          version: null,
          serviceId: null,
          pageRequest: crud.getQueryCondition()
        }
        this.searchForm()
      }
      ,

      deleteService (row) {
        util.confirm('是否删除该条服务记录？', this.del, row.serviceId)
      }
      ,
      del (id) {
        crud.post({
          service: 'admin/deleteService',
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
              this.getServiceList()
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
      ,

      handleSizeChange (limit) {
        this.queryCondition.pageRequest.limit = limit
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getServiceList()
      }
      ,
      handleCurrentChange (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getServiceList()
      }
      ,

      formatterCreatedAt (row, column, cellValue, index) {
        return util.formatDate(cellValue, 'YYYY-MM-DD hh:mm:ss')
      }
      ,
      formatterMoney (row, column, cellValue, index) {
        return util.formatNum(cellValue, 4)
      }
      ,
      formatterStatusLabel (row, column, cellValue, index) {
        return util.getEnumLabel(orderEnums.OrderStatusEnum, cellValue)
      }
    },

    created () {
      this.getServiceList()
    }
  }
</script>

<style lang="scss">
  .s-list {
    .f-left {
      float: left;
      .table-title-text {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
    }
    .f-right {
      float: right;
    }

    .f-right {
      float: right;
    }
    .s-dialog {
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
