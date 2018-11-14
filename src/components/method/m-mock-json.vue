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
  import * as crud from '../../api/api'

  export default {
    name: 'm-mock-json',
    // 注入vueJsonEditor组件
    components: {
      VueJsonEditor
    },
    data () {
      return {
        json: {
          msg: 'demo of jsoneditor'
        }
      }
    },
    methods: {
      onJsonChange (value) {
        console.log('value:', value)
      }
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
