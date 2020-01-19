<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>单分区部署</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SingleDeploy",
    data() {
      return {
        active: 0
      }
    },
    methods: {
      next() {
        if (this.active++ > 11) this.active = 0;
      }
    }
  }
</script>

<style scoped>

</style>
