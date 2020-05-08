<template>
  <div>
    <el-table :data="bindNicInfo" tyle="width: 100%" stripe v-loading="loading" element-loading-text="Nic卡绑定中"
              id="bindNicInfo">
      <el-table-column prop="id" label="id" type="index"/>
      <el-table-column prop="name" label="分区名称"/>
      <el-table-column prop="eth0" label="eth0"/>
      <el-table-column prop="eth1" label="eth1"/>
      <el-table-column prop="eth2" label="eth2"/>
      <el-table-column prop="eth3" label="eth3"/>
    </el-table>
    <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
  </div>
</template>

<script>
  export default {
    name: "BindNic",
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
