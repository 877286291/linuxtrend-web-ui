<template>
  <div>
    <el-table :data="bindNicInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="分区创建中"
              id="bindNicInfo">
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
    name: "bindNic",
    created() {
      this.bindNic()
    },
    data() {
      return {
        loading: true,
        bindNicInfo: []
      }
    },
    methods: {
      async bindNic() {
        this.loading = true;
        const {data: res} = await this.$http.get('bindNic');
        if (res.meta.status !== 200) return this.$message.error('Nic卡绑定失败');
        this.bindNicInfo = res.data;
        this.loading = false;
      },
      nextStep() {
        this.$parent.next('bind-sg')
      }
    }
  }
</script>

<style scoped>

</style>
