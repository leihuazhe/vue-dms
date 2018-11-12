<template>
  <div class="m-list c-container">
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
        <el-button type="primary" @click="addMethod">添加接口信息</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align='center' label="ID" min-width="80" prop="aaaa"></el-table-column>
        <el-table-column align='center' label="服务名称" min-width="120" prop="bbbb"></el-table-column>
        <el-table-column align='center' label="接口名称" min-width="120" prop="dddd"></el-table-column>
        <el-table-column align='center' label="请求类型" min-width="120" prop="cccc"></el-table-column>
        <el-table-column align='center' label="接口地址" min-width="120" prop="ffff"></el-table-column>
        <el-table-column align='center' label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryMockRule(scope.row)">查看Mock规则</el-button>
            <el-button type="text" size="small" @click="modifyMockRule(scope.row)">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增接口"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="right" :rules="rules" ref="methodForm" :model="methodForm">
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
                <el-option v-for="item in record.typeList" :value="item.value" :label="item.label" :key="item.value"></el-option>
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
import ListMixin from "../mixin/m-list";
export default {
  mixins: [ListMixin],
  name: "m-list",
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
      ],
      dialogVisible: false,
      methodForm: {},
      rules: {}
    };
  },
  methods: {
    queryMockRule () {
      this.$router.push({ name: "m-mock-rule" });
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
      this.dialogVisible = true
    },  
    modifyMockRule (row) {
      
    }
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
