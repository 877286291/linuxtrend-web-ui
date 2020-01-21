<template>
  <div class="app-container" v-loading="loading" element-loading-text="创建中">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <el-table :data="uploadData" highlight-current-row style="width: 100%;margin-top:20px;" max-height="500">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item"/>
    </el-table>
    <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
  </div>
</template>

<script>
  import UploadExcelComponent from '../UploadExcel/index.vue'

  export default {
    name: 'CreateStorageGroup',
    components: {UploadExcelComponent},
    data() {
      return {
        uploadData: [],
        tableHeader: [],
        loading: false
      }
    },
    methods: {
      async beforeUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (isLt10M) {
          const fd = new FormData()
          fd.append('profile', file)
          const {data: res} = await this.$http.post('handleProfile', fd);
          if (res.meta.status !== 200) return this.$message.error('配置文件上传服务器失败')
          return true
        }
        this.$message({
          message: '请不要上传超过10M的文件',
          type: 'warning'
        })
        return false
      },
      handleSuccess({results, header}) {
        this.uploadData = results;
        this.tableHeader = header
      },
      async nextStep() {
        this.loading = true;
        const {data: res} = await this.$http.post('createSG', {'profile': 'BZ12'});
        if (res.meta.status !== 200) this.$message.error('cpc获取失败');
        this.loading = false;
        this.$parent.next('export-wwpn')
      }
    }
  }
</script>

<style scoped>
  #nextStep {
    margin-bottom: 20px;
    position: absolute;
    bottom: 0;
    right: 10px;
  }
</style>
