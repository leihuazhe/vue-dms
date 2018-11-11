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
        <el-table-column align='center' label="ID" min-width="60" prop="serviceId"></el-table-column>
        <el-table-column align='center' label="服务简称" min-width="120" prop="simpleName"></el-table-column>
        <el-table-column align='center' label="服务全称" min-width="120" prop="service"></el-table-column>
        <el-table-column align='center' label="版本信息" min-width="60" prop="version"></el-table-column>
        <el-table-column align='center' label="元数据信息" min-width="120">
          <template slot-scope="scope">
            <el-button type="text">点击查看{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="Mock接口数量" min-width="120" prop="mockVoList"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看接口</el-button>
            <el-button type="text" size="small" @click="modify(scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="remove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import util from '../../assets/js/co-util'
  import { post } from '../../api/api'
  export default {
    name: "s-list",
    data () {
      return {
        tableData: [],
        queryCondition: {
         /* time: [],
          startTime: null,
          endTime: null,
          orderStatus: null,
          tradeType: null,
          paymentType: null,
          pageRequest: api.crud.getQueryCondition()*/
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
      }
    },
    created () {
      post({service: 'admin/listServices', data: {}}).then(res => {
        console.log(res)
          if (res.status === 1 && JSON.stringify(res.success.orders) !== 'undefined') {
            self.tableData = res.success.serviceList
            // self.queryCondition.pageRequest = api.crud.getCurrentPage(res.success.pageResponse)
          }
      })
    }
  }
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
