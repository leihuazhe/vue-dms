<template>
  <div class="p-list">
    <div class="c-content">
      <div class="f-left">
        <div class="table-title-text">项目列表</div>
      </div>
      <div class="f-right">
        <el-button type="primary">添加接口信息</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="120" prop="aaaa"></el-table-column>
        <el-table-column align='center' label="项目名称" min-width="120" prop="bbbb"></el-table-column>
        <el-table-column align='center' label="请求类型" min-width="120" prop="cccc"></el-table-column>
        <el-table-column align='center' label="接口名称" min-width="120" prop="dddd"></el-table-column>
        <el-table-column align='center' label="所属服务简介" min-width="120" prop="eeee"></el-table-column>
        <el-table-column align='center' label="接口地址" min-width="120" prop="ffff"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看Mock规则</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        aaaa:'108',
        bbbb: '1111111',
        cccc: '1111111',
        dddd: '1111111',
        eeee: '1111111',
        ffff: '1111111'
      }]
    }
  },
  created() {
    console.log('p-list')
  },
}
</script>

<style lang="scss">
.p-list {
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
