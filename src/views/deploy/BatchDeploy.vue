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
  import CreatePartition from "../../components/deploy/CreatePartition";
  import BindNic from "../../components/deploy/BindNic";
  import BindSG from "../../components/deploy/BindSG";
  import InstallOs from "../../components/deploy/InstallOs";
  import ChangeBoot from "../../components/deploy/ChangeBoot";
  import DeployComplete from "../../components/deploy/DeployComplete";

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
      'create-partition': CreatePartition,
      'bind-nic': BindNic,
      'bind-sg': BindSG,
      'install-os': InstallOs,
      'change-boot': ChangeBoot,
      'deploy-complete': DeployComplete,
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
