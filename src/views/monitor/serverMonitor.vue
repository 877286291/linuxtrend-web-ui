<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/serverList' }">主机列表</el-breadcrumb-item>
          <el-breadcrumb-item>主机监控</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4" :offset='10'>
        <el-dropdown hide-on-click>
          <el-button type="primary">
            分区列表<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for=" item in chartSettings.stack['分区']" :key="item" @click.native="getDetail(item)">
              {{item}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4">
        <el-date-picker
                v-model="dateScope"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-row>
<!--    <el-card style="margin-bottom: 20px;height: 380px">-->
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <div id="alarmSummary" style="border-radius: 4px">-->
<!--            错误事件-->
<!--            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"/>-->
<!--            警告事件-->
<!--            <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"/>-->
<!--            致命事件-->
<!--            <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"/>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <ve-ring :data="serverSummary"></ve-ring>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <ve-ring :data="serverSummary"></ve-ring>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <ve-ring :data="serverSummary"></ve-ring>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-card>-->
    <el-card>
      <ve-line :data="chartData" :settings="chartSettings" height="600px" :data-zoom="dataZoom" :loading="loading"
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
            show: true,
            start: 0,
            end: 100
          }
        ],
        chartData: {
          columns: [],
          rows: []
        },
        serverSummary: {
          columns: ['日期', '访问用户'],
          rows: [
            {'日期': '1/1', '访问用户': 1393},
            {'日期': '1/2', '访问用户': 3530},
          ]
        },
        loading: true,
        dataEmpty: false,
        dateScope: ''
      }
    },
    methods: {
      async getMonitorData(serverName) {
        this.loading = true;
        const {data: res} = await this.$http.post('servers', {'serverName': serverName});
        if (res.meta.status !== 200) return this.$message.error('主机监控数据获取失败！');
        this.chartSettings.stack['分区'] = res.data['stackList'];
        this.chartData.columns = res.data['serverList'];
        this.chartData.rows = res.data['rows'];
        this.loading = false;
        if (this.chartData.rows.length === 0) this.dataEmpty = true
      },
      getDetail(partitionName) {
        this.$router.push({
          path: '/partitionDetail/' + partitionName,
          query: {from: this.$route}
        })
      }
    }
  }
</script>

<style scoped>
  .el-button {
    margin-bottom: 5px;
  }

  .el-progress {
    margin-bottom: 100px;
  }

</style>
