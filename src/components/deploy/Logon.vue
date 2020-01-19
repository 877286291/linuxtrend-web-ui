<template>
  <el-form :model="logonForm" ref="logonFormRef" label-width="80px" style="margin-top: 20px" v-loading='loading'
           element-loading-text="登陆中">
    <el-form-item label="IP">
      <el-input v-model="logonForm.ip"/>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="logonForm.username"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="logonForm.password" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登陆</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Logon",
    data() {
      return {
        logonForm: {
          ip: '',
          username: '',
          password: '',
        },
        loading: false,
      }
    },
    methods: {
      async submitForm() {
        this.loading = true;
        const {data: res} = await this.$http.post('logonHMC', this.logonForm);
        this.loading = false;
        if (res.meta.status !== 200) return this.$message.error('HMC登陆失败');
        this.$parent.next('create-storage-group')
      },
      resetForm() {
        this.$refs.logonFormRef.resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>
