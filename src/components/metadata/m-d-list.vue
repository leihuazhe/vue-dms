<template>
  <div class="m-d-list c-container">
    <div class="c-header">
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item label="服务名称" class="c-query-input">
              <el-input v-model="queryCondition.serviceName" placeholder="支持模糊搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务版本" class="c-query-input">
              <el-input v-model="queryCondition.version" placeholder="支持模糊搜索"></el-input>
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
    </div>
    <div class="c-content">
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="服务Tag" class="c-query-input">
           <el-input v-model="data" placeholder="请输入服务Tag"></el-input>
         </el-form-item>-->
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="/admin/upload"
            multiple
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :on-error="uploadError"
            :data="tagData">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <!--<el-button size="small" type="primary" @click="parseFiles()">解析</el-button>-->
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column align='center' label="序号" width="50" type="index"></el-table-column>
        <el-table-column align='left' label="服务简称" min-width="150" prop="simpleName"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align='center' label="元数据全称" min-width="220" prop="serviceName"></el-table-column>
        <el-table-column align='center' label="版本信息" min-width="100" prop="version"></el-table-column>
        <el-table-column align='center' label="接口数量" min-width="70" prop="methodSize"></el-table-column>
        <el-table-column align='center' label="创建时间" min-width="100" prop="createAt"></el-table-column>
        <el-table-column align='center' label="操作" width="200">
          <!-- <template slot-scope="scope">
             <el-button type="text" size="small" @click="updateMetadata(scope.row)">更新</el-button>
           </template>-->

          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryDetails(scope.row.id)">查看详情</el-button>
            <el-button type="text" size="small">
              <el-upload
                class="update-upload"
                action="/admin/updateUpload"
                multiple
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="updateUploadSuccess"
                :on-error="updateUploadError"
                :data="getUpdateData(scope.row.serviceName)">
                <el-button size="small" type="text">上传更新</el-button>
              </el-upload>
            </el-button>

            <!--<el-button type="text" size="small" @click="refreshDetails(scope.row.serviceName)">刷新</el-button>-->
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
      title="刷新"
      :visible.sync="dialogVisible"
      width="40%"
      custom-class="method-dialog">
      <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="right" :rules="rules"
               ref="metaDataForm" :model="metaDataForm">
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="24">
            <el-form-item label="服务Tag" class="dialog-form-item" prop="tag">
              <el-input v-model.trim="metaDataForm.tag" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="start">
          <el-col :span="8">
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="/admin/upload"
                ref="upload"
                multiple
                :on-success="refreshUploadSuccess"
                :data="{data: metaDataForm.tag}"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClick">上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as crud from '../../api/api'
  import util from '../../assets/js/co-util'
  import { Loading } from 'element-ui'

  export default {
    name: 'm-d-list',
    data () {
      return {
        queryCondition: {
          serviceName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        },
        record: {
          typeList: [
            {
              value: 'get',
              label: 'GET'
            },
            {
              value: 'post',
              label: 'POST'
            }
          ]
        },
        tableData: [],
        metaDataForm: {},
        rules: {
          tag: [
            {
              required: true,
              message: '请输入Tag',
              trigger: 'blur'
            }
          ]
        },
        dialogVisible: false,
        tagData: null,
        loading: false,
        refreshServiceName: null // 刷新的元数据全称
      }
    },
    methods: {
      updateMetadata () {
      },
      getMetadataList () {
        const metadataId = this.$route.params.id
        let { serviceName, version, pageRequest } = this.queryCondition
        let request = {
          metadataId,
          serviceName,
          version,
          pageRequest
        }
        util.dealNullQueryCondition(request)
        crud
          .post({
            service: 'admin/listMetadata',
            dealException: true,
            data: request
          })
          .then(res => {
            const data = res.data
            if (
              data.status === 1 &&
              JSON.stringify(data.success.metadataList) !== 'undefined'
            ) {
              this.tableData = data.success.metadataList
              this.queryCondition.pageRequest = crud.getCurrentPage(
                data.success.pageResponse
              )
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.error('request admin/listMetadata error:', error)
            util.message({
              message: error,
              type: 'error'
            })
          })
      },
      searchForm () {
        this.queryCondition.pageRequest = crud.getQueryCondition()
        this.getMetadataList()
      },
      resetForm () {
        this.tableData = []
        this.queryCondition = {
          simpleName: null,
          methodName: null,
          pageRequest: crud.getQueryCondition()
        }
        this.searchForm()
      },
      beforeUpload (file) {
        const fileName = file.name
        const suffixName = fileName.substring(fileName.lastIndexOf('.') + 1)
        if (!['thrift', 'xml'].includes(suffixName)) {
          util.message({
            message: '上传失败,文件类型必须是 thrift 或 xml',
            type: 'error'
          })
          return false
        }
      },

      // 导入成功回调
      uploadSuccess (response, file, fileList) {
        const tag = this.tagData
        if (file === fileList[fileList.length - 1]) { // 判断是否为文件列表中最后一个
          this.loading = true
          this.parseFiles(tag)
        }
      },
      // 导入失败回调
      uploadError (response, file, fileList) {
        util.message({
          type: 'error',
          message: `${file.name}上传失败，请重新上传！`
        })
      },
      //更新时
      updateUploadSuccess (response, file, fileList) {
        if (file === fileList[fileList.length - 1]) { // 判断是否为文件列表中最后一个
          const serviceName = response.success
          this.loading = true
          this.parseUpdateFiles(serviceName)
        }
      },

      updateUploadError (response, file, fileList) {

      },
      getUpdateData (serviceName) {
        return { serviceName }
      },
      // 查看详情
      queryDetails (id) {
        this.$router.push({
          name: 'm-d-detail-list',
          params: { id }
        })
      },
      handleSizeChange (limit) {
        this.queryCondition.pageRequest.limit = limit
        this.queryCondition.pageRequest = crud.getQueryCondition(
          this.queryCondition.pageRequest
        )
        this.getMetadataList()
      },
      handleCurrentChange (pageIndex) {
        this.queryCondition.pageRequest.pageIndex = pageIndex
        this.queryCondition.pageRequest = crud.getQueryCondition(
          this.queryCondition.pageRequest
        )
        this.getMetadataList()
      },
      // 刷新
      refreshDetails (serviceName) {
        this.refreshServiceName = serviceName
        this.dialogVisible = true
      },
      // 上传
      saveClick () {
        // let { simpleService, method, requestType, url } = this.metaDataForm
        // let request = {
        //   simpleService,
        //   method,
        //   requestType,
        //   url
        // }
        // console.log(request)
        this.$refs['metaDataForm'].validate(valid => {
          if (valid) {
            let uploadFiles = this.$refs.upload.uploadFiles
            let result = uploadFiles.every(val => {
              return val.name.split('.')[1] === 'thrift'
            })
            if (
              (uploadFiles.length === 1 &&
                uploadFiles[0].raw.type === 'text/xml') ||
              result
            ) {
              this.$refs.upload.submit()
            } else {
              util.message({
                message: '文件格式错误',
                type: 'error'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 刷新成功的回调
      refreshUploadSuccess (response, file, fileList) {
        util.message({
          message: '上传成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.metaDataForm.tag = null
        this.$refs.upload.uploadFiles = []
      },
      /**
       * 解析上传的文件，并刷新表格.
       */
      parseFiles (tag1) {
        const tag = tag1.data
        if (!util.isNull(tag)) {
          util.message({
            message: '服务tag不能为空，请指定',
            type: 'error'
          })
          return
        }
        crud.post({
          service: 'admin/resourceGenerator',
          dealException: true,
          data: { tag }
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              this.tagData = util.uuid(8, 16)
              util.message({
                message: '解析文件成功!',
                type: 'info'
              })
              // this.loading.close()
              this.getMetadataList()
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
            this.loading = false
          })
          .catch(error => {
            console.error('request admin/resourceGenerator error:', error)
            util.message({
              message: error,
              type: 'error'
            })
            this.loading = false
          })
      },
      //更新上传后解析...
      parseUpdateFiles (serviceName) {
        if (!util.isNull(serviceName)) {
          util.message({
            message: '服务tag不能为空，请指定',
            type: 'error'
          })
          this.loading = false
          return
        }
        crud.post({
          service: 'admin/updateResourceGenerator',
          dealException: true,
          data: { serviceName }
        })
          .then(res => {
            const data = res.data
            if (data.status === 1) {
              util.message({
                message: '解析文件成功!',
                type: 'info'
              })
              // this.loading.close()
              this.getMetadataList()
            } else {
              util.message({
                message: data.responseMsg,
                type: 'error'
              })
            }
            this.loading = false
          })
          .catch(error => {
            console.error('request admin/resourceGenerator error:', error)
            util.message({
              message: error,
              type: 'error'
            })
            this.loading = false
          })
      }

    },
    created () {
      this.tagData = util.uuid(8, 16)
      this.getMetadataList()
    }
  }
</script>

<style lang="scss">
  .m-d-list {
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
    .el-table .cell {
      white-space: normal;
    }
  }
</style>
