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
              <el-form-item class="c-query-select" label="服务全称">
                <el-input v-model="queryCondition.service" placeholder="请输入完整货号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item class="c-query-select" label="服务ID">
              <el-input v-model.trim="queryCondition.serviceId" placeholder="请输入完整商品条码"></el-input>
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
        <el-table-column align='center' label="服务简称" min-width="120" prop="simpleName"></el-table-column>
        <el-table-column align='center' label="服务全称" min-width="120" prop="service"></el-table-column>
        <el-table-column align='center' label="元数据信息" min-width="120">
          <template slot-scope="scope">
            <el-button type="text">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align='center' label="Mock接口数量" min-width="120" prop="MockVoListNum"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看接口</el-button>
            <el-button type="text" size="small" @click="modify">修改</el-button>
            <el-button type="text" size="small" @click="remove">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import util from '../../assets/js/co-util'
  export default {
    name: "s-list",
    data () {
      return {
        tableData: [{
          simpleName:'108',
          service: '1111111',
          MockVoListNum: '1111111'
        }],
        queryCondition: {}
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
