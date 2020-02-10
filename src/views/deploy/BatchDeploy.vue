<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>批量部署</el-breadcrumb-item>
    </el-breadcrumb>
    <el-steps :active.sync="active" finish-status="success" style="margin-top: 30px;margin-bottom: 30px">
      <el-step title="登陆HMC"/>
      <el-step title="创建SG"/>
      <el-step title="导出WWPN"/>
      <el-step title="创建LPAR"/>
      <el-step title="绑定NIC卡"/>
      <el-step title="绑定SG"/>
      <el-step title="安装操作系统"/>
      <el-step title="修改启动项"/>
      <el-step title="完成"/>
    </el-steps>
    <div :is="currentView"></div>
  </div>
</template>

<script>
  import Logon from "../../components/deploy/Logon";
  import CreateStorageGroup from "../../components/deploy/CreateStorageGroup";
  import ExportWWPN from "../../components/deploy/ExportWWPN";
  import createPartition from "../../components/deploy/createPartition";
  import bindNic from "../../components/deploy/bindNic";
  import bindSG from "../../components/deploy/bindSG";

  export default {
    name: "BatchDeploy",
    data() {
      return {
        active: 0,
        currentView: 'logon'
      }
    },
    components: {
      'logon': Logon,
      'create-storage-group': CreateStorageGroup,
      'export-wwpn': ExportWWPN,
      'create-partition': createPartition,
      'bind-nic': bindNic,
      'bind-sg': bindSG,
    },
    methods: {
      next(step) {
        this.currentView = step;
        if (this.active++ > 8) this.active = 0;
      }
    }
  }
</script>

<style scoped>

</style>
