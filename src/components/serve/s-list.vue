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
                <el-input v-model="queryCondition.version" placeholder="1.0.0"></el-input>
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
              <el-button type="primary">搜索</el-button>
              <el-button class="c-button__default">重置</el-button>
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
        <el-button type="primary" @click="addServe">新增服务</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="30" prop="serviceId"></el-table-column>
        <el-table-column align='center' label="服务简称" min-width="120" prop="simpleName"></el-table-column>
        <el-table-column align='center' label="服务全称" min-width="120" prop="service"></el-table-column>
        <el-table-column align='center' label="版本信息" min-width="60" prop="version"></el-table-column>
        <el-table-column align='center' label="元数据信息" min-width="120">
          <template slot-scope="scope">
            <el-button type="text">点击查看{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="Mock接口数量" min-width="120" prop="mockVoList.length"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看接口</el-button>
            <el-button type="text" size="small" @click="modify(scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="remove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange2"
                       :current-page="queryCondition.pageRequest.pageIndex"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="queryCondition.pageRequest.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="queryCondition.pageRequest.results">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import util from '../../assets/js/co-util'
  import * as crud from '../../api/api'
  export default {
    name: "s-list",
    data () {
      return {
        tableData: [],
        queryCondition: {
          simpleName: null,
          version: null,
          serviceId: null,
          pageRequest: crud.getQueryCondition()
        }
      }
    },
    methods: {
      addServe () {
        this.$router.push({name: 'SAdd'})
      },
      modify () {
        this.$router.push({name: 'SModify'})
      },
      remove () {
        util.confirm('是否确定删除该服务？', _ => {})
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
          data: data,
          success: function (res) {
            console.log("res=>",res)
            const data = res.data;
            if (data.status === 1 && JSON.stringify(data.success.serviceList) !== 'undefined') {
              self.tableData = data.success.serviceList;
              self.queryCondition.pageRequest = crud.getCurrentPage(res.success.pageResponse)
            }
          },
          catch: function (ex){
            console.log(ex)
          }
        })
      },
      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition()
        let flag = this.queryCondition.simpleName || this.queryCondition.version || this.queryCondition.serviceId
        if (flag) {
          this.getServiceList()
        } else {
          util.message('查询输入项至少填写一个查询条件', 2500)
        }
      },
      handleSizeChange (limit) {
        this.queryCondition.pageRequest.limit = limit
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getServiceList()
      },
      handleCurrentChange2 (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex
        this.queryCondition.pageRequest = crud.getQueryCondition(this.queryCondition.pageRequest)
        this.getServiceList()
      },
      formatterCreatedAt (row, column, cellValue, index) {
        return util.formatDate(cellValue, 'YYYY-MM-DD hh:mm:ss')
      },
      formatterMoney (row, column, cellValue, index) {
        return util.formatNum(cellValue, 4)
      },
      formatterStatusLabel (row, column, cellValue, index) {
        return util.getEnumLabel(orderEnums.OrderStatusEnum, cellValue)
      }
    },

    created () {
      this.getServiceList()
      /*const self = this;
      crud.post({
        service: 'admin/listServices',
        data: {}
      })
        .then(res => {
          console.log(res);
          const data = res.data;
          if (data.status === 1 && JSON.stringify(data.success.serviceList) !== 'undefined') {
            self.tableData = data.success.serviceList;

            // self.queryCondition.pageRequest = api.crud.getCurrentPage(res.success.pageResponse)
          }
        });*/
    }
  };
</script>

<style lang="scss">
.s-list{
  .f-left {
    float: left;
  .table-title-text {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
  }
  .f-right{
    float: right;
  }
}
</style>
