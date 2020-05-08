<template>
  <div>
    <el-table :data="bindSGInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="SG绑定中"
              id="bindSGInfo">
      <el-table-column prop="id" label="id" type="index"/>
      <el-table-column prop="cpcName" label="CPC名称"/>
      <el-table-column prop="LparName" label="分区名称"/>
      <el-table-column prop="SG_Name" label="SG名称"/>
    </el-table>
    <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
  </div>
</template>

<script>
  export default {
    name: "bindSG",
    created() {
      this.bindSG()
    },
    data() {
      return {
        loading: true,
        bindSGInfo: []
      }
    },
    methods: {
      async bindSG() {
        this.loading = true;
        const {data: res} = await this.$http.get('bindSG');
        if (res.meta.status !== 200) return this.$message.error('SG绑定失败');
        this.bindSGInfo = res.data;
        this.loading = false;
      },
      nextStep() {
        this.$parent.next('install-os')
      }
    }
  }
</script>

<style scoped>

</style>
