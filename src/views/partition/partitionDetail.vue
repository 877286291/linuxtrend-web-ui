<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/serverList' }">主机列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="this.$route.query.from">主机监控</el-breadcrumb-item>
      <el-breadcrumb-item>分区监控</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CPU" name="1">
        <el-card>
          <ve-line :data="cpuData" height="700px" ref="chart1"/>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="内存" name="2">
        <el-card>
          <ve-ring :data="memoryData" ref="chart2"/>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="磁盘" name="3">
        <el-card>
          <ve-line :data="diskData" ref="chart3"/>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="网络" name="4">
        <el-card>
          <ve-line :data="netData" ref="chart4"/>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="负载" name="5">负载</el-tab-pane>
      <el-tab-pane label="进程" name="6">进程</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "partitionDetail",
    created() {
      this.getPartitionData(this.$route.params['partitionName'])
    },
    data() {
      return {
        cpuData: {
          columns: ['时间', 'CPU使用率'],
          rows: []
        },
        memoryData: {
          columns: ['维度', '内存'],
          rows: []
        },
        netData: {
          columns: ['时间', '下行流量', '上行流量'],
          rows: []
        },
        diskData: {
          columns: ['时间', '磁盘写入', '磁盘读出'],
          rows: []
        },
        activeName: '1',
      }
    },
    methods: {
      handleClick(tab, event) {

      },
      async getPartitionData(partitionName) {
        const {data: res} = await this.$http.post('partitions', {'partitionName': partitionName});
        if (res.meta.status !== 200) return this.$message.error('分区监控数据获取失败！');
        this.cpuData.rows = res.data[0];
        this.memoryData.rows = res.data[1];
        this.diskData.rows = res.data[2];
        this.netData.rows = res.data[3];
      }
    },
    watch: {
      activeName(v) {
        this.$nextTick(_ => {
          this.$refs[`chart${v}`].echarts.resize()
        })
      }
    }
  }
</script>

<style scoped>

</style>
