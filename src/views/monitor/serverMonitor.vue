<template>
  <div>
    <!-- 面包屑头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>主机监控</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <ve-line :data="chartData" :settings="chartSettings" height="800px"/>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "serverMonitor",
    created() {
    },
    data() {
      this.chartSettings = {
        stack: {'分区': ['JX3600BP', 'CQ5000BB', 'SI1400BP']},
        area: true
      };
      return {
        chartData: {
          columns: ['时间', 'JX3600BP', 'CQ5000BB', 'SI1400BP'],
          rows: [
            {'时间': '00:00', 'JX3600BP': 1393, 'CQ5000BB': 1093, 'SI1400BP': 0.32 * 1000},
            {'时间': '00:01', 'JX3600BP': 3530, 'CQ5000BB': 3230, 'SI1400BP': 0.26 * 1000},
            {'时间': '00:02', 'JX3600BP': 2923, 'CQ5000BB': 2623, 'SI1400BP': 0.76 * 1000},
            {'时间': '00:03', 'JX3600BP': 1723, 'CQ5000BB': 1423, 'SI1400BP': 0.49 * 1000},
            {'时间': '00:04', 'JX3600BP': 3792, 'CQ5000BB': 3492, 'SI1400BP': 0.323 * 1000},
            {'时间': '00:05', 'JX3600BP': 4593, 'CQ5000BB': 4293, 'SI1400BP': 0.78 * 1000}
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
