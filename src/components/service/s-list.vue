<template>
  <div class="s-list c-container">
    <div class="c-header">
      <el-collapse @change="collapseHandler" v-model="expandName">
        <el-collapse-item :title="searchArr" name="1">
          <el-form :inline="true" class="demo-form-inline">
            <el-row type="flex" align="middle" justify="start">
              <el-col :span="8">
                <el-form-item label="接口名" class="c-query-input">
                  <el-input v-model="queryCondition.service"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="方法名" class="c-query-input">
                  <el-input v-model="queryCondition.method"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div class="f-right">
                  <el-button type="primary" @click="searchClick">搜索</el-button>
                  <el-button class="c-button__default">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="c-content">
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
            <el-button type="text" size="small" @click="queryMockRule(scope.row)">查看Mock规则</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ListMixin from "../mixin/m-list";
export default {
  mixins: [ListMixin],
  name: "s-list",
  data () {
    return {
      tableData: [
        {
          aaaa: "108",
          bbbb: "1111111",
          cccc: "1111111",
          dddd: "1111111",
          eeee: "1111111",
          ffff: "1111111"
        }
      ]
    };
  },
  methods: {
    queryMockRule () {
      this.$router.push({ name: "i-mock-rule" });
    },
    searchClick () {
      this.search();
    },
    search () {
      let { service, method } = this.queryCondition;
    }
  }
};
</script>

<style lang="scss">
.s-list {
  .f-right {
    float: right;
  }
}
</style>
