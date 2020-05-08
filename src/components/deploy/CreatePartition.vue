<template>
  <div>
    <el-table :data="partitionInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="分区创建中" id="partitionInfo">
      <el-table-column prop="id" label="id" type="index"/>
      <el-table-column prop="name" label="分区名称"/>
      <el-table-column prop="short-name" label="Short Name"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="processor-mode" label="处理器模式"/>
      <el-table-column prop="ifl-processors" label="CPU核数"/>
      <el-table-column prop="initial-memory" label="初始内存"/>
      <el-table-column prop="maximum-memory" label="最大内存"/>
    </el-table>
    <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
  </div>
</template>

<script>
  export default {
    name: "CreatePartition",
    created() {
      this.createPartiton()
    },
    data() {
      return {
        loading: true,
        partitionInfo: []
      }
    },
    methods: {
      async createPartiton() {
        this.loading = true;
        const {data: res} = await this.$http.get('createPartition');
        if (res.meta.status !== 200) return this.$message.error('分区创建失败');
        this.partitionInfo = res.data;
        this.loading = false;
      },
      nextStep() {
        this.$parent.next('bind-nic')
      }
    }
  }
</script>

<style scoped>

</style>
