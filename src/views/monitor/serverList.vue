<template>
  <div>
    <!-- 面包屑头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主机列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="serverList" stripe style="width: 100%" v-loading="loading" border>
        <el-table-column prop="id" label="id" type="index"/>
        <el-table-column prop="sn" label="主机序列号"/>
        <el-table-column prop="hmc" label="HMC地址"/>
        <el-table-column prop="area" label="地区"/>
        <el-table-column prop="desc" label="描述"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="查看详情" placement="top">
              <el-button type="primary" icon="el-icon-data-line" @click="getServerDetail(scope.row['sn'])"/>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "serverList",
    created() {
      this.getServerList()
    },
    data() {
      return {
        serverList: [],
        total: [],
        loading: true
      }
    },
    methods: {
      async getServerList() {
        const {data: res} = await this.$http.get('servers');
        if (res.meta.status !== 200) return this.$message.error('主机列表获取失败');
        this.loading = false;
        this.serverList = res.data['servers']
      },
      getServerDetail(serverName) {
        this.$router.push({
          path: '/serverMonitor/' + serverName
        });
      }
    }
  }
</script>

<style scoped>

</style>
