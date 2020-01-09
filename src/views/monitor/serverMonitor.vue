<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/serverList' }">主机列表</el-breadcrumb-item>
      <el-breadcrumb-item>主机监控</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <ve-line :data="chartData" :settings="chartSettings" height="800px" :data-zoom="dataZoom" :loading="loading"
               :data-empty="dataEmpty"/>
    </el-card>
  </div>
</template>

<script>
  export default {
    created() {
      this.getMonitorData(this.$route.params.serverName)
    },
    name: "serverMonitor",
    data() {
      return {
        chartSettings: {
          stack: {'分区': []},
          area: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            start: 0,
            end: 100
          }
        ],
        chartData: {
          columns: [],
          rows: []
        },
        loading: true,
        dataEmpty: false
      }
    },
    methods: {
      async getMonitorData(serverName) {
        this.loading = true;
        const {data: res} = await this.$http.post('servers', {'serverName': serverName});
        if (res.meta.status !== 200) return this.$message.error('监控数据获取失败！');
        this.chartSettings.stack['分区'] = res.data['stackList'];
        this.chartData.columns = res.data['serverList'];
        this.chartData.rows = res.data['rows'];
        this.loading = false;
        if (this.chartData.rows.length === 0) this.dataEmpty = true
      }
    }
  }
</script>

<style scoped>

</style>
