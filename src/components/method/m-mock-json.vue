<template>
  <div class="m-mock-json c-container">
    <div>
      <p>vue-json-editor使用</p>
      <!--在模板中使用vue-json-editor-->
      <vue-json-editor v-model="json" :showBtns="true" @json-change="onJsonChange"></vue-json-editor>
    </div>



  </div>

</template>

<script>
  import VueJsonEditor from 'vue-json-editor'

  export default {
    name: 'm-mock-json',
    // 注入vueJsonEditor组件
    components: {
      VueJsonEditor
    },
    data () {
      json: {
        msg: 'demo of jsoneditor'
      }
      return {
        queryCondition: {
          methodId: null,
          pageRequest: crud.getQueryCondition()
        },
        options: {
          mode: 'code'
        },
        methodForm: {
          serviceName: null,
          methodName: null
        },
        tableData: [],
        MockRuleForm: {},
        rules: {},
        mockType: '',
        MockDialogVisible: false,
        editMockForm: {}
      }
    },
    methods: {
      onJsonChange (value) {
        console.log('value:', value)
      }
    },

    created () {
      this.render()
    }
  }
</script>

<style lang="scss">
  .m-mock-json {
    .f-right {
      float: right;
    }
    .mock-dialog {
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
